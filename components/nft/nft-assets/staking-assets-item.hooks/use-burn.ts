import { SHARED_OBJECTS } from '@interest-protocol/blizzard-sdk';
import {
  useCurrentAccount,
  useSignTransaction,
  useSuiClient,
} from '@mysten/dapp-kit';
import invariant from 'tiny-invariant';

import useBlizzardSdk from '@/hooks/use-blizzard-sdk';
import { signAndExecute } from '@/utils';

import { UnstakeArgs } from '../../nft.types';

export const useBurn = () => {
  const client = useSuiClient();
  const blizzardSdk = useBlizzardSdk();
  const currentAccount = useCurrentAccount();
  const signTransaction = useSignTransaction();

  return async ({ objectId, onSuccess, onFailure }: UnstakeArgs) => {
    invariant(currentAccount?.address, 'You must be logged in');

    const { returnValues: wal, tx } = await blizzardSdk.burnStakeNft({
      nft: objectId,
      blizzardStaking: SHARED_OBJECTS.WWAL_STAKING({
        mutable: true,
      }).objectId,
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
