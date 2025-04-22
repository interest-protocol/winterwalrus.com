import { POOLS } from '@interest-protocol/interest-stable-swap-sdk';
import {
  useCurrentAccount,
  useSignTransaction,
  useSuiClient,
} from '@mysten/dapp-kit';
import { coinWithBalance, Transaction } from '@mysten/sui/transactions';
import { values } from 'ramda';
import invariant from 'tiny-invariant';

import useInterestStableSdk from '@/hooks/use-interest-stable-sdk';
import { signAndExecute } from '@/utils';

import { SwapArgs } from '../swap-form-button.types';

export const useSwap = () => {
  const client = useSuiClient();
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
  }: SwapArgs) => {
    const pool = values(POOLS).find(
      ({ coinTypes }) =>
        coinTypes.includes(coinInType) && coinTypes.includes(coinOutType)
    );

    invariant(pool, 'Failed to load pool');
    invariant(currentAccount?.address, 'You must be logged in');
    invariant(interestStableSdk, 'Failed to load sdk');

    const tx = new Transaction();

    tx.setSender(currentAccount.address);

    const coinIn = coinWithBalance({
      type: coinInType,
      balance: coinInValue,
    })(tx);

    const { returnValues } = await interestStableSdk.swap({
      tx,
      coinIn,
      coinInType,
      coinOutType,
      pool: pool.objectId,
      minAmountOut: coinOutValue,
    });

    tx.transferObjects([returnValues], currentAccount.address);

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
