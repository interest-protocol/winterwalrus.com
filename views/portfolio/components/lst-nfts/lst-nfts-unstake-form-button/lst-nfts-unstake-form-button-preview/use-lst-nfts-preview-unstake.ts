import { useCurrentAccount, useSuiClient } from '@mysten/dapp-kit';
import { coinWithBalance } from '@mysten/sui/transactions';
import useSWR from 'swr';
import invariant from 'tiny-invariant';

import { STAKING_OBJECT } from '@/constants';
import useBlizzardSdk from '@/hooks/use-blizzard-sdk';

import { LSTNFTsUnstakeArgs } from '../native-staked--unstake-form-button.types';

export const useLSTNFTsPreviewUnstake = ({
  coinIn,
  coinInValue,
  coinOutValue,
}: Omit<LSTNFTsUnstakeArgs, 'onFailure' | 'onSuccess'>) => {
  const client = useSuiClient();
  const blizzardSdk = useBlizzardSdk();
  const currentAccount = useCurrentAccount();

  return useSWR(
    [blizzardSdk, currentAccount, coinIn, coinInValue, coinOutValue],
    async () => {
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

      tx.setSenderIfNotSet(currentAccount.address);

      return client.dryRunTransactionBlock({
        transactionBlock: await tx.build({ client }),
      });
    }
  );
};
