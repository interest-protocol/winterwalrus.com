import {
  useCurrentAccount,
  useSignTransaction,
  useSuiClient,
} from '@mysten/dapp-kit';
import { coinWithBalance } from '@mysten/sui/transactions';
import invariant from 'tiny-invariant';

import { STAKING_OBJECT } from '@/constants';
import useBlizzardSdk from '@/hooks/use-blizzard-sdk';
import { signAndExecute } from '@/utils';

import { NativeStakedWalUnstakeArgs } from '../native-staked--unstake-form-button.types';

export const useNativeStakedWalUnstake = () => {
  const client = useSuiClient();
  const blizzardSdk = useBlizzardSdk();
  const currentAccount = useCurrentAccount();
  const signTransaction = useSignTransaction();

  return async ({
    coinIn,
    onSuccess,
    onFailure,
    coinInValue,
    coinOutValue,
  }: NativeStakedWalUnstakeArgs) => {
    invariant(currentAccount?.address, 'You must be logged in');
    invariant(blizzardSdk, 'Failed to load sdk');

    const {
      returnValues: [, withdrawIXs],
      tx,
    } = await blizzardSdk.fcfs({
      value: coinOutValue,
      blizzardStaking: STAKING_OBJECT[coinIn],
    });

    tx.setSender(currentAccount.address);

    const lstCoin = coinWithBalance({
      type: coinIn,
      balance: coinInValue,
    })(tx);

    const {
      returnValues: [extraLst, stakedWalVector],
    } = await blizzardSdk.burnLst({
      tx,
      lstCoin,
      withdrawIXs,
      blizzardStaking: STAKING_OBJECT[coinIn],
    });

    tx.transferObjects([extraLst], currentAccount.address);

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
