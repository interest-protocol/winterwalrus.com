import { SuiGrpcClient } from '@mysten/sui/grpc';
import { Transaction } from '@mysten/sui/transactions';
import { normalizeSuiAddress } from '@mysten/sui/utils';
import invariant from 'tiny-invariant';

import { Network } from '@/constants/network';

export type SuiClient = SuiGrpcClient;

export interface JsonObject {
  type: string;
  objectId: string;
  json: Record<string, unknown>;
}

export const createSuiClient = (network: Network, baseUrl: string) =>
  new SuiGrpcClient({ network, baseUrl });

export const getJsonObjects = async (
  client: SuiClient,
  objectIds: ReadonlyArray<string>
): Promise<ReadonlyArray<JsonObject>> => {
  if (!objectIds.length) return [];

  const { objects } = await client.getObjects({
    objectIds: [...objectIds],
    include: { json: true },
  });

  return objects.flatMap((object) =>
    object instanceof Error
      ? []
      : [
          {
            objectId: object.objectId,
            type: object.type,
            json: object.json ?? {},
          },
        ]
  );
};

export const getJsonObject = async (client: SuiClient, objectId: string) => {
  const { object } = await client.getObject({
    objectId,
    include: { json: true },
  });

  return {
    objectId: object.objectId,
    type: object.type,
    json: object.json ?? {},
  } as JsonObject;
};

export const listOwnedJsonObjects = async (
  client: SuiClient,
  owner: string,
  type?: string
): Promise<ReadonlyArray<JsonObject>> => {
  const objects: JsonObject[] = [];
  let cursor: string | null = null;

  do {
    const page: Awaited<
      ReturnType<typeof client.listOwnedObjects<{ json: true }>>
    > = await client.listOwnedObjects({
      owner,
      type,
      cursor,
      include: { json: true },
    });

    objects.push(
      ...page.objects.map((object) => ({
        objectId: object.objectId,
        type: object.type,
        json: object.json ?? {},
      }))
    );

    cursor = page.hasNextPage ? page.cursor : null;
  } while (cursor);

  return objects;
};

/**
 * Simulates `tx` without validation checks (a.k.a. devInspect) and returns
 * the BCS return values of every command.
 */
export const devInspect = async (client: SuiClient, tx: Transaction) => {
  tx.setSenderIfNotSet(normalizeSuiAddress('0x0'));

  const result = await client.simulateTransaction({
    transaction: tx,
    checksEnabled: false,
    include: { effects: true, commandResults: true },
  });

  invariant(
    result.$kind === 'Transaction',
    result.FailedTransaction?.effects.status.error?.message ??
      'Failed to inspect transaction'
  );

  return result.commandResults.map(({ returnValues }) =>
    returnValues.map(({ bcs }) => bcs)
  );
};
