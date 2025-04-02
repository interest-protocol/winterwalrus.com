import {
  DryRunTransactionBlockResponse,
  SuiTransactionBlockResponse,
} from '@mysten/sui/client';

import {
  SignAndExecuteArgs,
  TimedSuiTransactionBlockResponse,
  WaitForTxArgs,
} from './utils.types';

const throwTxIfNotSuccessful = (
  tx: SuiTransactionBlockResponse | DryRunTransactionBlockResponse,
  callback?: (string?: string) => void
) => {
  if (!!tx.effects?.status && tx.effects.status.status !== 'success') {
    callback?.(tx.effects.status.error);
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
  callback,
  fallback,
  currentAccount,
  signTransaction,
}: SignAndExecuteArgs): Promise<TimedSuiTransactionBlockResponse> => {
  tx.setSenderIfNotSet(currentAccount.address);

  const txDryResult = await client.dryRunTransactionBlock({
    transactionBlock: await tx.build({ client }),
  });

  const { signature, bytes: transactionBlock } =
    await signTransaction.mutateAsync({
      transaction: tx,
      account: currentAccount,
    });

  throwTxIfNotSuccessful(txDryResult, fallback);

  callback?.(txDryResult);

  const startTime = Date.now();

  const txResult = await client.executeTransactionBlock({
    signature,
    transactionBlock,
    options: { showEffects: true, ...options },
  });

  const time = Number(txResult.timestampMs ?? Date.now()) - startTime;

  throwTxIfNotSuccessful(txResult, fallback);

  waitForTx({ client, digest: txResult.digest });

  return { ...txResult, time };
};
