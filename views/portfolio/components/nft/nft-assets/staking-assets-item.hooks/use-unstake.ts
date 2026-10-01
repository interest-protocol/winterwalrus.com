import {
  useCurrentAccount,
  useCurrentClient,
  useDAppKit,
} from '@mysten/dapp-kit-react';
import { Transaction } from '@mysten/sui/transactions';
import invariant from 'tiny-invariant';

import useWalrusSdk from '@/hooks/use-walrus-sdk';
import { signAndExecute } from '@/utils';

import { UnstakeArgs } from '../../nft.types';

export const useUnstake = () => {
  const dAppKit = useDAppKit();
  const client = useCurrentClient();
  const walrus = useWalrusSdk();
  const currentAccount = useCurrentAccount();

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
    ]({ tx: new Transaction(), stakedWal: objectId });

    if (wal) tx.transferObjects([wal], currentAccount.address);

    return signAndExecute({
      tx,
      client,
      dAppKit,
      currentAccount,
      callback: onSuccess,
      fallback: onFailure,
    });
  };
};
