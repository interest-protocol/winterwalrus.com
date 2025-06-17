import {
  useCurrentAccount,
  useSignTransaction,
  useSuiClient,
} from '@mysten/dapp-kit';
import invariant from 'tiny-invariant';

import { STAKING_OBJECT } from '@/constants';
import useBlizzardSdk from '@/hooks/use-blizzard-sdk';
import { signAndExecute } from '@/utils';

import { BurnArgs } from '../../nft.types';

export const useBurn = () => {
  const client = useSuiClient();
  const blizzardSdk = useBlizzardSdk();
  const currentAccount = useCurrentAccount();
  const signTransaction = useSignTransaction();

  return async ({ objectId, onSuccess, onFailure, lst }: BurnArgs) => {
    invariant(currentAccount?.address, 'You must be logged in');
    invariant(blizzardSdk, 'Failed to load sdk');

    const { returnValues: wal, tx } = await blizzardSdk.burnStakeNft({
      nft: objectId,
      blizzardStaking: STAKING_OBJECT[lst],
    });

    tx.transferObjects([wal], currentAccount.address);

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
