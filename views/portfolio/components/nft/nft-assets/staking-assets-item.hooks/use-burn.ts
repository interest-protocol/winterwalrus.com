import {
  useCurrentAccount,
  useCurrentClient,
  useDAppKit,
} from '@mysten/dapp-kit-react';
import { Transaction } from '@mysten/sui/transactions';
import invariant from 'tiny-invariant';

import { STAKING_OBJECT } from '@/constants';
import useBlizzardSdk from '@/hooks/use-blizzard-sdk';
import { signAndExecute } from '@/utils';

import { BurnArgs } from '../../nft.types';

export const useBurn = () => {
  const dAppKit = useDAppKit();
  const client = useCurrentClient();
  const blizzardSdk = useBlizzardSdk();
  const currentAccount = useCurrentAccount();

  return async ({ objectId, onSuccess, onFailure, lst }: BurnArgs) => {
    invariant(currentAccount?.address, 'You must be logged in');
    invariant(blizzardSdk, 'Failed to load sdk');

    const { returnValues: wal, tx } = await blizzardSdk.burnStakeNft({
      tx: new Transaction(),
      nft: objectId,
      blizzardStaking: STAKING_OBJECT[lst],
    });

    tx.transferObjects([wal], currentAccount.address);

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
