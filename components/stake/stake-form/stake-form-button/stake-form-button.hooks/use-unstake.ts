import { SHARED_OBJECTS, TYPES } from '@interest-protocol/blizzard-sdk';
import {
  useCurrentAccount,
  useSignTransaction,
  useSuiClient,
} from '@mysten/dapp-kit';
import invariant from 'tiny-invariant';

import useBlizzardSdk from '@/hooks/use-blizzard-sdk';
import { useNetwork } from '@/hooks/use-network';
import { getCoinOfValue, signAndExecute } from '@/utils';

import { UnstakeArgs } from '../stake-form-button.types';

export const useUnstake = () => {
  const network = useNetwork();
  const client = useSuiClient();
  const blizzardSdk = useBlizzardSdk();
  const currentAccount = useCurrentAccount();
  const signTransaction = useSignTransaction();

  return async ({ coinIn, coinValue, onSuccess, onFailure }: UnstakeArgs) => {
    invariant(currentAccount?.address, 'You must be logged in');

    const { returnValues: withdrawIXs, tx } = await blizzardSdk.fcfs({
      value: coinValue,
      blizzardStaking: SHARED_OBJECTS[network].SNOW_STAKING({
        mutable: true,
      }).objectId,
    });

    const lstCoin = await getCoinOfValue({
      tx,
      client,
      coinValue,
      coinType: coinIn,
      account: currentAccount.address,
    });

    const { returnValues: stakedWalVector } = await blizzardSdk.burnLst({
      tx,
      lstCoin,
      withdrawIXs,
      minWalValue: coinValue,
      blizzardStaking: SHARED_OBJECTS[network].SNOW_STAKING({
        mutable: true,
      }).objectId,
    });

    blizzardSdk.vectorTransfer({
      tx,
      vector: stakedWalVector,
      to: currentAccount.address,
      type: TYPES[network].STAKED_WAL,
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
