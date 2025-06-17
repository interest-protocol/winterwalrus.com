import {
  useCurrentAccount,
  useSignTransaction,
  useSuiClient,
} from '@mysten/dapp-kit';
import invariant from 'tiny-invariant';

import useWalrusSdk from '@/hooks/use-walrus-sdk';
import { signAndExecute } from '@/utils';

import { UnstakeArgs } from '../../nft.types';

export const useUnstake = () => {
  const client = useSuiClient();
  const walrus = useWalrusSdk();
  const currentAccount = useCurrentAccount();
  const signTransaction = useSignTransaction();

  return async ({
    objectId,
    onSuccess,
    onFailure,
    canWithdrawEarly,
  }: UnstakeArgs) => {
    invariant(currentAccount?.address, 'You must be logged in');
    invariant(walrus, 'Failed to load sdk');

    const { returnValue: wal, tx } = walrus[
      canWithdrawEarly ? 'withdrawStake' : 'requestWithdrawing'
    ]({ stakedWal: objectId });

    if (wal) tx.transferObjects([wal], currentAccount.address);

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
