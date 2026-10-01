import {
  useCurrentAccount,
  useCurrentClient,
  useDAppKit,
} from '@mysten/dapp-kit-react';
import { coinWithBalance, Transaction } from '@mysten/sui/transactions';
import invariant from 'tiny-invariant';

import { STAKING_OBJECT } from '@/constants';
import useBlizzardSdk from '@/hooks/use-blizzard-sdk';
import { signAndExecute } from '@/utils';

import { LSTNFTsUnstakeArgs } from '../lst-nfts-unstake-form-button.types';

export const useLSTNFTsUnstake = () => {
  const dAppKit = useDAppKit();
  const client = useCurrentClient();
  const blizzardSdk = useBlizzardSdk();
  const currentAccount = useCurrentAccount();

  return async ({
    coinIn,
    onSuccess,
    onFailure,
    coinInValue,
    coinOutValue,
  }: LSTNFTsUnstakeArgs) => {
    invariant(currentAccount?.address, 'You must be logged in');
    invariant(blizzardSdk, 'Failed to load sdk');

    const tx = new Transaction();

    tx.setSender(currentAccount.address);

    const {
      returnValues: [, withdrawIXs],
    } = await blizzardSdk.fcfs({
      tx,
      value: coinOutValue,
      blizzardStaking: STAKING_OBJECT[coinIn],
    });

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
      dAppKit,
      currentAccount,
      callback: onSuccess,
      fallback: onFailure,
    });
  };
};
