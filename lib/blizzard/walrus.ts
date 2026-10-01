import { bcs } from '@mysten/sui/bcs';
import { Transaction, TransactionResult } from '@mysten/sui/transactions';
import { pathOr } from 'ramda';
import invariant from 'tiny-invariant';

import { devInspect, getJsonObject, SuiClient } from '@/lib/sui';

import { getEpochData } from './blizzard';
import { Modules, PACKAGES, SHARED_OBJECTS } from './constants';

// Ported from @interest-protocol/walrus-sdk@2.0.0
export class WalrusClient {
  constructor(private readonly client: SuiClient) {}

  async canWithdrawEarly(stakedWal: string) {
    const tx = new Transaction();

    tx.moveCall({
      package: PACKAGES.WALRUS.latest,
      module: Modules.WalrusStaking,
      function: 'can_withdraw_staked_wal_early',
      arguments: [
        tx.sharedObjectRef(SHARED_OBJECTS.WALRUS_STAKING({ mutable: false })),
        tx.object(stakedWal),
      ],
    });

    const [[result]] = await devInspect(this.client, tx);

    invariant(result, 'Invalid return values');

    return bcs.bool().parse(result);
  }

  async calculatePendingRewards(stakedWal: string) {
    const [{ json }, { currentEpoch }] = await Promise.all([
      getJsonObject(this.client, stakedWal),
      getEpochData(this.client),
    ]);

    // Blizzard stake NFTs wrap the StakedWal in `inner`
    const stakedWalJson = pathOr(json, ['inner'], json);

    const tx = new Transaction();

    tx.moveCall({
      package: PACKAGES.WALRUS.latest,
      module: Modules.WalrusStaking,
      function: 'calculate_rewards',
      arguments: [
        tx.sharedObjectRef(SHARED_OBJECTS.WALRUS_STAKING({ mutable: false })),
        tx.pure.id(pathOr('', ['node_id'], stakedWalJson)),
        tx.pure.u64(pathOr('0', ['principal'], stakedWalJson)),
        tx.pure.u32(Number(pathOr(0, ['activation_epoch'], stakedWalJson))),
        tx.pure.u32(currentEpoch),
      ],
    });

    const [[result]] = await devInspect(this.client, tx);

    invariant(result, 'Invalid return values');

    return BigInt(bcs.u64().parse(result));
  }

  requestWithdrawing({
    tx,
    stakedWal,
  }: {
    tx: Transaction;
    stakedWal: string;
  }): { tx: Transaction; returnValue: null } {
    tx.moveCall({
      package: PACKAGES.WALRUS.latest,
      module: Modules.WalrusStaking,
      function: 'request_withdraw_stake',
      arguments: [
        tx.sharedObjectRef(SHARED_OBJECTS.WALRUS_STAKING({ mutable: true })),
        tx.object(stakedWal),
      ],
    });

    return { tx, returnValue: null };
  }

  withdrawStake({ tx, stakedWal }: { tx: Transaction; stakedWal: string }): {
    tx: Transaction;
    returnValue: TransactionResult;
  } {
    return {
      tx,
      returnValue: tx.moveCall({
        package: PACKAGES.WALRUS.latest,
        module: Modules.WalrusStaking,
        function: 'withdraw_stake',
        arguments: [
          tx.sharedObjectRef(SHARED_OBJECTS.WALRUS_STAKING({ mutable: true })),
          tx.object(stakedWal),
        ],
      }),
    };
  }
}
