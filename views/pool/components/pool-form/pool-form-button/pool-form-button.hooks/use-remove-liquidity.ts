import {
  useCurrentAccount,
  useSignTransaction,
  useSuiClient,
} from '@mysten/dapp-kit';
import { coinWithBalance } from '@mysten/sui/transactions';
import invariant from 'tiny-invariant';

import useInterestStableSdk from '@/hooks/use-interest-stable-sdk';
import { signAndExecute } from '@/utils';

import { UseRemoveLiquidityArgs } from '../pool-form-button.types';

export const useRemoveLiquidity = () => {
  const client = useSuiClient();
  const currentAccount = useCurrentAccount();
  const signTransaction = useSignTransaction();
  const interestStableSdk = useInterestStableSdk();

  return async ({
    pool,
    coinType,
    lpAmount,
    onFailure,
    onSuccess,
  }: UseRemoveLiquidityArgs) => {
    invariant(currentAccount, 'You must be connected');
    invariant(interestStableSdk, 'Failed to load sdk');

    const lpCoin = coinWithBalance({
      type: pool.lpCoinType,
      balance: lpAmount,
    });

    let tx;
    let assetsToTransfer = [];

    if (coinType) {
      const response = await interestStableSdk.removeLiquidityOneCoin({
        lpCoin,
        pool: pool.objectId,
        coinOutType: coinType,
      });

      tx = response.tx;
      assetsToTransfer = [response.returnValues];
    } else {
      const response = await interestStableSdk.removeLiquidity({
        pool,
        lpCoin,
      });

      tx = response.tx;
      assetsToTransfer = pool.coins.map((_, i) => response.returnValues[i]);
    }

    tx.transferObjects(assetsToTransfer, currentAccount.address);

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
