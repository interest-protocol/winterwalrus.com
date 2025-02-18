import { SuiTransactionBlockResponse } from '@mysten/sui/client';

import {
  SignAndExecuteArgs,
  TimedSuiTransactionBlockResponse,
  WaitForTxArgs,
} from './utils.types';

const throwTXIfNotSuccessful = (
  tx: SuiTransactionBlockResponse,
  callback?: () => void
) => {
  if (!!tx.effects?.status && tx.effects.status.status !== 'success') {
    callback?.();
    throw new Error('Transaction failed');
  }
};

const waitForTx = async ({
  client,
  digest,
  timeout = 10000,
  pollInterval = 500,
}: WaitForTxArgs) =>
  client.waitForTransaction({
    digest,
    timeout,
    pollInterval,
  });

export const signAndExecute = async ({
  tx,
  client,
  options,
  currentAccount,
  signTransaction,
}: SignAndExecuteArgs): Promise<TimedSuiTransactionBlockResponse> => {
  const { signature, bytes } = await signTransaction.mutateAsync({
    account: currentAccount,
    transaction: tx,
  });

  const startTime = Date.now();

  const txResult = await client.executeTransactionBlock({
    transactionBlock: bytes,
    signature,
    options: {
      showEffects: true,
      ...options,
    },
    requestType: 'WaitForLocalExecution',
  });

  const time = Date.now() - startTime;

  throwTXIfNotSuccessful(txResult);

  waitForTx({ client, digest: txResult.digest });

  return {
    ...txResult,
    time,
  };
};
