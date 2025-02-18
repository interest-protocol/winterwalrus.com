import { Network, TYPES } from '@interest-protocol/blizzard-sdk';
import {
  useCurrentAccount,
  useSignTransaction,
  useSuiClient,
} from '@mysten/dapp-kit';
import { Transaction } from '@mysten/sui/transactions';
import invariant from 'tiny-invariant';

import { MYSTEN_LABS_K8S } from '@/constants';
import { STAKING_COIN } from '@/constants/ coins';
import useBlizzardSdk from '@/hooks/use-blizzard-sdk';
import { getCoinOfValue } from '@/utils/coin';
import { signAndExecute } from '@/utils/tx';

import { StakeArgs } from './stake-form-button.types';

export const useStake = () => {
  const client = useSuiClient();
  const blizzardSdk = useBlizzardSdk();
  const currentAccount = useCurrentAccount();
  const signTransaction = useSignTransaction();

  return async ({
    coinOut,
    coinValue,
    nodeId = MYSTEN_LABS_K8S,
    coinIn = TYPES[Network.Testnet].WAL,
  }: StakeArgs) => {
    invariant(currentAccount?.address, 'You must be logged in');

    const tx = new Transaction();

    const inCoin = await getCoinOfValue({
      tx,
      client,
      coinValue,
      coinType: coinIn,
      account: currentAccount.address,
    });

    const { returnValues: coin } = await blizzardSdk.mint({
      tx,
      nodeId,
      walCoin: inCoin,
      blizzardStaking: STAKING_COIN[coinOut],
    });

    tx.transferObjects([coin], currentAccount.address);

    return signAndExecute({ tx, client, signTransaction, currentAccount });
  };
};
