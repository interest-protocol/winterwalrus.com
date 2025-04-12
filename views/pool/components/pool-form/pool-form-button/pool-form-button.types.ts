import { InterestStablePool } from '@interest-protocol/interest-stable-swap-sdk';
import { DryRunTransactionBlockResponse } from '@mysten/sui/client';

export interface UseAddLiquidityArgs {
  poolId: string;
  onFailure: (error?: string) => void;
  onSuccess: (tx: DryRunTransactionBlockResponse) => void;
  coins: ReadonlyArray<{
    type: string;
    balance: bigint;
  }>;
}

export interface UseRemoveLiquidityArgs {
  lpAmount: bigint;
  coinType: string | null;
  pool: InterestStablePool;
  onFailure: (error?: string) => void;
  onSuccess: (tx: DryRunTransactionBlockResponse) => void;
}
