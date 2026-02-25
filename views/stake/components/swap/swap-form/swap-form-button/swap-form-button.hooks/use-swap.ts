import { TYPES } from '@interest-protocol/blizzard-sdk';
import {
  useCurrentAccount,
  useSignTransaction,
  useSuiClient,
} from '@mysten/dapp-kit';
import { coinWithBalance, Transaction } from '@mysten/sui/transactions';
import invariant from 'tiny-invariant';

import { STAKING_OBJECT } from '@/constants';
import useAftermathSdk from '@/hooks/use-aftermath-sdk';
import useBlizzardSdk from '@/hooks/use-blizzard-sdk';
import useEpochData from '@/hooks/use-epoch-data';
import { signAndExecute } from '@/utils';

import { SwapArgs } from '../swap-form-button.types';

export const useSwap = () => {
  const client = useSuiClient();
  const blizzardSdk = useBlizzardSdk();
  const aftermathSdk = useAftermathSdk();
  const currentAccount = useCurrentAccount();
  const signTransaction = useSignTransaction();
  const { data: epoch } = useEpochData();

  return async ({
    onSuccess,
    onFailure,
    coinInType,
    coinOutType,
    coinInValue,
    coinInNoFeeValue,
  }: SwapArgs) => {
    invariant(currentAccount?.address, 'You must be logged in');
    invariant(aftermathSdk && blizzardSdk && epoch, 'Failed to load sdk');

    const router = aftermathSdk.Router();

    const needsTransmute =
      coinInType !== TYPES.WAL && coinInType !== TYPES.WWAL;

    if (!needsTransmute) {
      // Path 1: Direct swap (WAL↔WWAL) via Aftermath Router
      const route = await router.getCompleteTradeRouteGivenAmountIn({
        coinInType,
        coinOutType,
        coinInAmount: coinInValue,
      });

      const txForRoute = await router.getTransactionForCompleteTradeRoute({
        walletAddress: currentAccount.address,
        completeRoute: route,
        slippage: 0.01,
      });

      return signAndExecute({
        tx: txForRoute,
        client,
        currentAccount,
        signTransaction,
        callback: onSuccess,
        fallback: onFailure,
      });
    }

    if (coinOutType === TYPES.WWAL) {
      // Path 2: LST→WWAL (pure Blizzard transmute)
      const tx = new Transaction();

      tx.setSender(currentAccount.address);

      const coinIn = coinWithBalance({
        type: coinInType,
        balance: coinInValue,
      })(tx);

      const {
        returnValues: [, withdrawIXs],
      } = await blizzardSdk.fcfs({
        tx,
        value: coinInNoFeeValue,
        blizzardStaking: STAKING_OBJECT[coinInType],
      });

      const {
        returnValues: [extraLst, wWal],
      } = await blizzardSdk.transmute({
        tx,
        withdrawIXs,
        fromCoin: coinIn,
        fromBlizzardStaking: STAKING_OBJECT[coinInType],
      });

      tx.transferObjects([extraLst, wWal], currentAccount.address);

      return signAndExecute({
        tx,
        client,
        currentAccount,
        signTransaction,
        callback: onSuccess,
        fallback: onFailure,
      });
    }

    // Path 3: LST→WAL (transmute to wWAL, then Aftermath Router wWAL→WAL)
    const tx = new Transaction();

    tx.setSender(currentAccount.address);

    const coinIn = coinWithBalance({
      type: coinInType,
      balance: coinInValue,
    })(tx);

    const {
      returnValues: [, withdrawIXs],
    } = await blizzardSdk.fcfs({
      tx,
      value: coinInNoFeeValue,
      blizzardStaking: STAKING_OBJECT[coinInType],
    });

    const {
      returnValues: [extraLst, wWal],
    } = await blizzardSdk.transmute({
      tx,
      withdrawIXs,
      fromCoin: coinIn,
      fromBlizzardStaking: STAKING_OBJECT[coinInType],
    });

    // Calculate expected wWAL amount for routing
    const walAmount = await blizzardSdk.toWalAtEpoch({
      epoch: epoch.currentEpoch,
      blizzardStaking: STAKING_OBJECT[coinInType],
      value: String(coinInNoFeeValue),
    });

    const wWalAmount = await blizzardSdk.toLstAtEpoch({
      value: walAmount!,
      epoch: epoch.currentEpoch,
      blizzardStaking: STAKING_OBJECT[TYPES.WWAL],
    });

    const route = await router.getCompleteTradeRouteGivenAmountIn({
      coinInType: TYPES.WWAL,
      coinOutType,
      coinInAmount: BigInt(wWalAmount!),
    });

    const { tx: swapTx, coinOutId } =
      await router.addTransactionForCompleteTradeRoute({
        tx,
        walletAddress: currentAccount.address,
        completeRoute: route,
        slippage: 0.01,
        coinInId: wWal,
      });

    const transferObjs = [extraLst];
    if (coinOutId) transferObjs.push(coinOutId);

    swapTx.transferObjects(transferObjs, currentAccount.address);

    return signAndExecute({
      tx: swapTx,
      client,
      currentAccount,
      signTransaction,
      callback: onSuccess,
      fallback: onFailure,
    });
  };
};
