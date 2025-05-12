import {
  useCurrentAccount,
  useSignTransaction,
  useSuiClient,
} from '@mysten/dapp-kit';
import { coinWithBalance, Transaction } from '@mysten/sui/transactions';
import invariant from 'tiny-invariant';

import { STAKING_OBJECT } from '@/constants';
import useBlizzardSdk from '@/hooks/use-blizzard-sdk';
import { signAndExecute } from '@/utils';

import { TransmuteArgs } from '../transmute-form-button.types';

export const useTransmute = () => {
  const client = useSuiClient();
  const blizzardSdk = useBlizzardSdk();
  const currentAccount = useCurrentAccount();
  const signTransaction = useSignTransaction();

  return async ({
    onSuccess,
    onFailure,
    coinInType,
    coinInValue,
    coinOutValue,
  }: TransmuteArgs) => {
    invariant(currentAccount?.address, 'You must be logged in');
    invariant(blizzardSdk, 'Failed to load sdk');

    const tx = new Transaction();

    tx.setSender(currentAccount.address);

    const coinIn = coinWithBalance({
      type: coinInType,
      balance: coinInValue,
    })(tx);

    const {
      returnValues: [, withdrawIXs],
    } = await blizzardSdk.fcfs({
      tx,
      value: coinOutValue,
      blizzardStaking: STAKING_OBJECT[coinInType],
    });

    const {
      returnValues: [extraLst, wWal],
    } = await blizzardSdk.transmute({
      tx,
      withdrawIXs,
      fromCoin: coinIn,
      fromBlizzardStaking: STAKING_OBJECT[coinInType],
    });

    tx.transferObjects([extraLst, wWal], currentAccount.address);

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
