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

import { UnstakeArgs } from '../unstake-form-button.types';

export const useUnstake = () => {
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
  }: UnstakeArgs) => {
    invariant(currentAccount?.address, 'You must be logged in');

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
