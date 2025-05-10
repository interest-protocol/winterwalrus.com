import {
  useCurrentAccount,
  useSignTransaction,
  useSuiClient,
} from '@mysten/dapp-kit';
import { coinWithBalance } from '@mysten/sui/transactions';
import invariant from 'tiny-invariant';

import useInterestStableSdk from '@/hooks/use-interest-stable-sdk';
import { signAndExecute } from '@/utils';

import { UseAddLiquidityArgs } from '../pool-form-button.types';

export const useAddLiquidity = () => {
  const client = useSuiClient();
  const currentAccount = useCurrentAccount();
  const signTransaction = useSignTransaction();
  const interestStableSdk = useInterestStableSdk();

  return async ({
    coins,
    poolId,
    onFailure,
    onSuccess,
  }: UseAddLiquidityArgs) => {
    invariant(currentAccount, 'You must be connected');
    invariant(interestStableSdk, 'Failed to load sdk');

    const coinsWithBalance = coins.map(coinWithBalance);

    const { returnValues: lpCoin, tx } = await interestStableSdk.addLiquidity({
      pool: poolId,
      coins: coinsWithBalance,
    });

    tx.transferObjects([lpCoin], currentAccount.address);

    await signAndExecute({
      tx,
      client,
      currentAccount,
      signTransaction,
      fallback: onFailure,
      callback: onSuccess,
    });
  };
};
