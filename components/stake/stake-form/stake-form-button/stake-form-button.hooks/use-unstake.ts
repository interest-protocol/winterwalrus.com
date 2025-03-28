import { SHARED_OBJECTS } from '@interest-protocol/blizzard-sdk';
import {
  useCurrentAccount,
  useSignTransaction,
  useSuiClient,
} from '@mysten/dapp-kit';
import { coinWithBalance } from '@mysten/sui/transactions';
import invariant from 'tiny-invariant';

import useBlizzardSdk from '@/hooks/use-blizzard-sdk';
import { signAndExecute } from '@/utils';

import { UnstakeArgs } from '../stake-form-button.types';

export const useUnstake = () => {
  const client = useSuiClient();
  const blizzardSdk = useBlizzardSdk();
  const currentAccount = useCurrentAccount();
  const signTransaction = useSignTransaction();

  return async ({ coinIn, coinValue, onSuccess, onFailure }: UnstakeArgs) => {
    invariant(currentAccount?.address, 'You must be logged in');

    const { returnValues: withdrawIXs, tx } = await blizzardSdk.fcfs({
      value: coinValue,
      blizzardStaking: SHARED_OBJECTS.WWAL_STAKING({
        mutable: true,
      }).objectId,
    });

    tx.setSender(currentAccount.address);

    const lstCoin = coinWithBalance({
      type: coinIn,
      balance: coinValue,
    })(tx);

    const { returnValues: stakedWalVector } = await blizzardSdk.burnLst({
      tx,
      lstCoin,
      withdrawIXs,
      blizzardStaking: SHARED_OBJECTS.WWAL_STAKING({
        mutable: true,
      }).objectId,
    });

    blizzardSdk.vectorTransferStakedWal({
      tx,
      vector: stakedWalVector,
      to: currentAccount.address,
    });

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
