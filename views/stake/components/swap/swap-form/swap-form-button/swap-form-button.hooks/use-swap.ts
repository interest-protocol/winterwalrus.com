import { TYPES } from '@interest-protocol/blizzard-sdk';
import { POOLS } from '@interest-protocol/interest-stable-swap-sdk';
import {
  useCurrentAccount,
  useSignTransaction,
  useSuiClient,
} from '@mysten/dapp-kit';
import { coinWithBalance, Transaction } from '@mysten/sui/transactions';
import { BigNumber } from 'bignumber.js';
import { values } from 'ramda';
import invariant from 'tiny-invariant';

import { STAKING_OBJECT } from '@/constants';
import useBlizzardSdk from '@/hooks/use-blizzard-sdk';
import useInterestStableSdk from '@/hooks/use-interest-stable-sdk';
import { signAndExecute } from '@/utils';

import { SwapArgs } from '../swap-form-button.types';

export const useSwap = () => {
  const client = useSuiClient();
  const blizzardSdk = useBlizzardSdk();
  const currentAccount = useCurrentAccount();
  const signTransaction = useSignTransaction();
  const interestStableSdk = useInterestStableSdk();

  return async ({
    onSuccess,
    onFailure,
    coinInType,
    coinOutType,
    coinInValue,
    coinOutValue,
    coinInNoFeeValue,
  }: SwapArgs) => {
    invariant(currentAccount?.address, 'You must be logged in');
    invariant(interestStableSdk && blizzardSdk, 'Failed to load sdk');

    const tx = new Transaction();

    tx.setSender(currentAccount.address);

    let pool = values(POOLS).find(
      ({ coinTypes }) =>
        coinTypes.includes(coinInType) && coinTypes.includes(coinOutType)
    );

    const coinIn = coinWithBalance({
      type: coinInType,
      balance: coinInValue,
    })(tx);

    if (pool) {
      const { returnValues } = await interestStableSdk.swap({
        tx,
        coinIn,
        coinInType,
        coinOutType,
        pool: pool.objectId,
        minAmountOut: coinOutValue,
      });

      tx.transferObjects([returnValues], currentAccount.address);
    } else if (coinOutType === TYPES.WWAL) {
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
    } else {
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

      pool = values(POOLS).find(
        ({ coinTypes }) =>
          coinTypes.includes(TYPES.WWAL) && coinTypes.includes(coinOutType)
      );

      const { returnValues } = await interestStableSdk.swap({
        tx,
        coinOutType,
        coinIn: wWal,
        pool: pool!.objectId,
        coinInType: TYPES.WWAL,
        minAmountOut: BigNumber(String(coinOutValue))
          .times(0.95)
          .decimalPlaces(0, 1)
          .toString(),
      });

      tx.transferObjects([returnValues, extraLst], currentAccount.address);
    }

    return signAndExecute({
      tx,
      client,
      currentAccount,
      signTransaction,
      callback: onSuccess,
      fallback: onFailure,
    });
  };
};
