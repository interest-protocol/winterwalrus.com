import { bcs } from '@mysten/sui/bcs';
import {
  Transaction,
  TransactionObjectArgument,
  TransactionResult,
} from '@mysten/sui/transactions';
import {
  isValidSuiObjectId,
  normalizeStructTag,
  normalizeSuiAddress,
} from '@mysten/sui/utils';
import { pathOr } from 'ramda';
import invariant from 'tiny-invariant';

import { devInspect, getJsonObject, SuiClient } from '@/lib/sui';

import {
  INNER_LST_STATE_ID,
  INNER_WALRUS_STAKING_ID,
  Modules,
  PACKAGES,
  SHARED_OBJECTS,
} from './constants';

export type U64 = string | bigint | number;

export type NestedResult = TransactionResult[number];

export type OwnedObject = TransactionObjectArgument | string;

export type SharedObject =
  | string
  | {
      objectId: string;
      mutable: boolean;
      initialSharedVersion: number | string;
    };

interface TxReturn<T> {
  tx: Transaction;
  returnValues: T;
}

export interface EpochData {
  currentEpoch: number;
  epochDurationMs: number;
  msUntilNextEpoch: number;
  firstEpochStartTimestamp: number;
}

export const objectIdOf = (object: SharedObject) =>
  typeof object === 'string' ? object : object.objectId;

export const sharedObject = (tx: Transaction, object: SharedObject) =>
  typeof object === 'string' ? tx.object(object) : tx.sharedObjectRef(object);

export const ownedObject = (tx: Transaction, object: OwnedObject) =>
  typeof object === 'string' ? tx.object(object) : object;

const assertObjectId = (object: SharedObject | OwnedObject) => {
  if (typeof object === 'string')
    invariant(isValidSuiObjectId(object), 'Invalid object id');
  else if ('objectId' in object)
    invariant(isValidSuiObjectId(object.objectId), 'Invalid object id');
};

const assertNotZeroAddress = (address: string) =>
  invariant(
    normalizeSuiAddress(address) !== normalizeSuiAddress('0x0'),
    'Invalid address: 0x0'
  );

export const getEpochData = async (client: SuiClient): Promise<EpochData> => {
  const { json } = await getJsonObject(client, INNER_WALRUS_STAKING_ID);

  const currentEpoch = Number(pathOr(0, ['value', 'epoch'], json));
  const epochDurationMs = Number(pathOr(0, ['value', 'epoch_duration'], json));
  const firstEpochStartTimestamp = Number(
    pathOr(0, ['value', 'first_epoch_start'], json)
  );

  return {
    currentEpoch,
    epochDurationMs,
    firstEpochStartTimestamp,
    msUntilNextEpoch:
      firstEpochStartTimestamp + currentEpoch * epochDurationMs - Date.now(),
  };
};

const lstTypeCache = new Map<string, string>();

export class BlizzardClient {
  constructor(private readonly client: SuiClient) {}

  async getLstType(blizzardStaking: SharedObject) {
    const id = objectIdOf(blizzardStaking);
    const cached = lstTypeCache.get(id);

    if (cached) return cached;

    const { object } = await this.client.getObject({ objectId: id });

    const type = object.type.split('<')[1]?.slice(0, -1);

    invariant(type, 'Invalid Blizzard Staking: no type found');

    lstTypeCache.set(id, normalizeStructTag(type));

    return normalizeStructTag(type);
  }

  getEpochData() {
    return getEpochData(this.client);
  }

  async getFees(blizzardStaking: SharedObject) {
    const id = INNER_LST_STATE_ID[objectIdOf(blizzardStaking)];

    invariant(id, 'Blizzard inner state not found');

    const { json } = await getJsonObject(this.client, id);

    return {
      mint: Number(pathOr(0, ['fee_config', 'mint', 'pos0'], json)),
      burn: Number(pathOr(0, ['fee_config', 'burn', 'pos0'], json)),
      transmute: Number(pathOr(0, ['fee_config', 'transmute', 'pos0'], json)),
    };
  }

  private async exchangeRateAtEpoch(
    fn: 'to_wal_at_epoch' | 'to_lst_at_epoch',
    {
      epoch,
      value,
      blizzardStaking,
    }: { epoch: number; value: U64; blizzardStaking: SharedObject }
  ) {
    assertObjectId(blizzardStaking);

    const lstType = await this.getLstType(blizzardStaking);
    const tx = new Transaction();

    tx.moveCall({
      package: PACKAGES.BLIZZARD.latest,
      module: Modules.Protocol,
      function: 'sync_exchange_rate',
      arguments: [
        sharedObject(tx, blizzardStaking),
        tx.sharedObjectRef(SHARED_OBJECTS.WALRUS_STAKING({ mutable: false })),
      ],
      typeArguments: [lstType],
    });

    tx.moveCall({
      package: PACKAGES.BLIZZARD.latest,
      module: Modules.Protocol,
      function: fn,
      arguments: [
        sharedObject(tx, blizzardStaking),
        tx.pure.u32(epoch),
        tx.pure.u64(value),
        tx.pure.bool(false),
      ],
      typeArguments: [lstType],
    });

    const [, [result]] = await devInspect(this.client, tx);

    invariant(result, 'Invalid result: no return value found');

    return bcs.option(bcs.u64()).parse(result);
  }

  toWalAtEpoch(args: {
    epoch: number;
    value: U64;
    blizzardStaking: SharedObject;
  }) {
    return this.exchangeRateAtEpoch('to_wal_at_epoch', args);
  }

  toLstAtEpoch(args: {
    epoch: number;
    value: U64;
    blizzardStaking: SharedObject;
  }) {
    return this.exchangeRateAtEpoch('to_lst_at_epoch', args);
  }

  async allowedNodes(blizzardStaking: SharedObject) {
    assertObjectId(blizzardStaking);

    const lstType = await this.getLstType(blizzardStaking);
    const tx = new Transaction();

    tx.moveCall({
      package: PACKAGES.BLIZZARD.latest,
      module: Modules.Protocol,
      function: 'allowed_nodes',
      typeArguments: [lstType],
      arguments: [sharedObject(tx, blizzardStaking)],
    });

    const [[result]] = await devInspect(this.client, tx);

    invariant(result, 'Invalid result: no allowed nodes found');

    return bcs.vector(bcs.Address).parse(result);
  }

  getAllowedVersions(tx: Transaction) {
    return tx.moveCall({
      package: PACKAGES.BLIZZARD.latest,
      module: Modules.AllowedVersions,
      function: 'get_allowed_versions',
      arguments: [
        sharedObject(tx, SHARED_OBJECTS.BLIZZARD_AV({ mutable: false })),
      ],
    });
  }

  private async mintWith(
    fn: 'mint' | 'mint_after_votes_finished',
    {
      tx,
      walCoin,
      nodeId,
      blizzardStaking,
    }: {
      tx: Transaction;
      nodeId: string;
      walCoin: OwnedObject;
      blizzardStaking: SharedObject;
    }
  ): Promise<TxReturn<TransactionResult>> {
    assertObjectId(walCoin);
    assertObjectId(nodeId);
    assertObjectId(blizzardStaking);
    assertNotZeroAddress(nodeId);

    const lstType = await this.getLstType(blizzardStaking);

    return {
      tx,
      returnValues: tx.moveCall({
        package: PACKAGES.BLIZZARD.latest,
        module: Modules.Protocol,
        function: fn,
        arguments: [
          sharedObject(tx, blizzardStaking),
          sharedObject(tx, SHARED_OBJECTS.WALRUS_STAKING({ mutable: true })),
          ownedObject(tx, walCoin),
          tx.pure.id(nodeId),
          this.getAllowedVersions(tx),
        ],
        typeArguments: [lstType],
      }),
    };
  }

  mint(args: {
    tx: Transaction;
    nodeId: string;
    walCoin: OwnedObject;
    blizzardStaking: SharedObject;
  }) {
    return this.mintWith('mint', args);
  }

  mintAfterVotesFinished(args: {
    tx: Transaction;
    nodeId: string;
    walCoin: OwnedObject;
    blizzardStaking: SharedObject;
  }) {
    return this.mintWith('mint_after_votes_finished', args);
  }

  keepStakeNft({
    tx,
    nft,
  }: {
    tx: Transaction;
    nft: TransactionObjectArgument;
  }): TxReturn<null> {
    tx.moveCall({
      package: PACKAGES.BLIZZARD.latest,
      module: Modules.StakeNFT,
      function: 'keep',
      arguments: [nft],
    });

    return { tx, returnValues: null };
  }

  async burnStakeNft({
    tx,
    nft,
    blizzardStaking,
  }: {
    tx: Transaction;
    nft: OwnedObject;
    blizzardStaking: SharedObject;
  }): Promise<TxReturn<TransactionResult>> {
    assertObjectId(nft);
    assertObjectId(blizzardStaking);

    const lstType = await this.getLstType(blizzardStaking);

    return {
      tx,
      returnValues: tx.moveCall({
        package: PACKAGES.BLIZZARD.latest,
        module: Modules.Protocol,
        function: 'burn_stake_nft',
        arguments: [
          sharedObject(tx, blizzardStaking),
          sharedObject(tx, SHARED_OBJECTS.WALRUS_STAKING({ mutable: false })),
          ownedObject(tx, nft),
          this.getAllowedVersions(tx),
        ],
        typeArguments: [lstType],
      }),
    };
  }

  async fcfs({
    tx,
    value,
    blizzardStaking,
  }: {
    tx: Transaction;
    value: U64;
    blizzardStaking: SharedObject;
  }): Promise<TxReturn<TransactionResult>> {
    assertObjectId(blizzardStaking);
    invariant(
      BigInt(value.toString()) > BigInt(0),
      'Value must be greater than 0'
    );

    const lstType = await this.getLstType(blizzardStaking);

    return {
      tx,
      returnValues: tx.moveCall({
        package: PACKAGES.BLIZZARD_HOOKS.latest,
        module: Modules.Hooks,
        function: 'fcfs',
        arguments: [
          sharedObject(tx, blizzardStaking),
          sharedObject(tx, SHARED_OBJECTS.WALRUS_STAKING({ mutable: true })),
          tx.pure.u64(value),
        ],
        typeArguments: [lstType],
      }),
    };
  }

  vectorTransferStakedWal({
    tx,
    vector,
    to,
  }: {
    tx: Transaction;
    to: string;
    vector: NestedResult;
  }): TxReturn<null> {
    assertNotZeroAddress(to);

    tx.moveCall({
      package: PACKAGES.BLIZZARD_UTILS.latest,
      module: Modules.Utils,
      function: 'vector_transfer_staked_wal',
      arguments: [
        sharedObject(tx, SHARED_OBJECTS.WALRUS_STAKING({ mutable: false })),
        vector,
        tx.pure.address(to),
      ],
    });

    return { tx, returnValues: null };
  }

  async burnLst({
    tx,
    lstCoin,
    withdrawIXs,
    blizzardStaking,
  }: {
    tx: Transaction;
    lstCoin: OwnedObject;
    withdrawIXs: NestedResult;
    blizzardStaking: SharedObject;
  }): Promise<TxReturn<TransactionResult>> {
    assertObjectId(lstCoin);

    const lstType = await this.getLstType(blizzardStaking);

    return {
      tx,
      returnValues: tx.moveCall({
        package: PACKAGES.BLIZZARD.latest,
        module: Modules.Protocol,
        function: 'burn_lst',
        arguments: [
          sharedObject(tx, blizzardStaking),
          sharedObject(tx, SHARED_OBJECTS.WALRUS_STAKING({ mutable: true })),
          ownedObject(tx, lstCoin),
          withdrawIXs,
          this.getAllowedVersions(tx),
        ],
        typeArguments: [lstType],
      }),
    };
  }

  async transmute({
    tx,
    fromCoin,
    withdrawIXs,
    fromBlizzardStaking,
  }: {
    tx: Transaction;
    fromCoin: OwnedObject;
    withdrawIXs: NestedResult;
    fromBlizzardStaking: SharedObject;
  }): Promise<TxReturn<TransactionResult>> {
    assertObjectId(fromBlizzardStaking);
    assertObjectId(fromCoin);

    const lstType = await this.getLstType(fromBlizzardStaking);
    const wWalStaking = SHARED_OBJECTS.WWAL_STAKING({ mutable: true });

    invariant(
      normalizeSuiAddress(objectIdOf(fromBlizzardStaking)) !==
        normalizeSuiAddress(wWalStaking.objectId),
      'Cannot transmute from wWAL'
    );

    return {
      tx,
      returnValues: tx.moveCall({
        package: PACKAGES.BLIZZARD.latest,
        module: Modules.Protocol,
        function: 'transmute',
        arguments: [
          sharedObject(tx, fromBlizzardStaking),
          sharedObject(tx, wWalStaking),
          sharedObject(tx, SHARED_OBJECTS.WALRUS_STAKING({ mutable: true })),
          ownedObject(tx, fromCoin),
          withdrawIXs,
          this.getAllowedVersions(tx),
        ],
        typeArguments: [lstType],
      }),
    };
  }
}
