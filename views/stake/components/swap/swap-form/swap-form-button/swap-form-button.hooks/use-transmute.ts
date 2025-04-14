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

import { SwapArgs } from '../swap-form-button.types';

export const useTransmute = () => {
  const client = useSuiClient();
  const blizzardSdk = useBlizzardSdk();
  const currentAccount = useCurrentAccount();
  const signTransaction = useSignTransaction();

  return async ({
    nodeId,
    coinIn,
    coinOut,
    coinValue,
    onSuccess,
    onFailure,
    isAfterVote,
  }: SwapArgs) => {
    invariant(currentAccount?.address, 'You must be logged in');
    invariant(blizzardSdk, 'Failed to load sdk');

    const tx = new Transaction();

    tx.setSender(currentAccount.address);

    const walCoin = coinWithBalance({
      type: coinIn,
      balance: coinValue,
    })(tx);

    const { returnValues } = await blizzardSdk[
      isAfterVote ? 'mintAfterVotesFinished' : 'mint'
    ]({
      tx,
      nodeId,
      walCoin,
      blizzardStaking: STAKING_OBJECT[coinOut],
    });

    if (isAfterVote) blizzardSdk.keepStakeNft({ tx, nft: returnValues });
    else tx.transferObjects([returnValues], currentAccount.address);

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
