import type { SuiClientTypes } from '@mysten/sui/client';
import { Transaction } from '@mysten/sui/transactions';
import { fromBase64 } from '@mysten/sui/utils';

import { SuiClient } from '@/lib/sui';

import { SignAndExecuteArgs, TxResult } from './utils.types';

const TX_INCLUDE = {
  effects: true,
  objectTypes: true,
  balanceChanges: true,
} as const;

type TransactionResult = SuiClientTypes.TransactionResult<typeof TX_INCLUDE>;

const toTxResult = (result: TransactionResult): TxResult => {
  const { digest, effects, objectTypes, balanceChanges } =
    result.Transaction ?? result.FailedTransaction;

  return {
    digest,
    balanceChanges,
    deletedObjectIds: effects.changedObjects
      .filter(({ outputState }) => outputState === 'DoesNotExist')
      .map(({ objectId }) => objectId),
    createdObjects: effects.changedObjects
      .filter(({ idOperation }) => idOperation === 'Created')
      .map(({ objectId }) => ({
        objectId,
        objectType: objectTypes[objectId] ?? '',
      })),
  };
};

const throwTxIfNotSuccessful = (
  result: TransactionResult,
  callback?: (string?: string) => void
) => {
  if (result.$kind === 'FailedTransaction') {
    callback?.(result.FailedTransaction.effects.status.error?.message);
    throw new Error('Transaction failed');
  }
};

export const simulateTx = async (client: SuiClient, tx: Transaction) =>
  toTxResult(
    await client.simulateTransaction({
      transaction: await tx.build({ client }),
      include: TX_INCLUDE,
    })
  );

export const signAndExecute = async ({
  tx,
  client,
  dAppKit,
  callback,
  fallback,
  currentAccount,
}: SignAndExecuteArgs): Promise<TxResult> => {
  tx.setSenderIfNotSet(currentAccount.address);

  const txDryResult = await client.simulateTransaction({
    transaction: await tx.build({ client }),
    include: TX_INCLUDE,
  });

  throwTxIfNotSuccessful(txDryResult, fallback);

  const { signature, bytes } = await dAppKit.signTransaction({
    transaction: tx,
  });

  const txResult = await client.executeTransaction({
    signatures: [signature],
    transaction: fromBase64(bytes),
    include: TX_INCLUDE,
  });

  throwTxIfNotSuccessful(txResult, fallback);

  client.waitForTransaction({ result: txResult }).catch(() => null);

  const result = toTxResult(txResult);

  callback?.(result);

  return result;
};
