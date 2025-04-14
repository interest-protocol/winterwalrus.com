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
  pool: string;
  lpType: string;
  lpAmount: bigint;
  coinsLength: number;
  coinType: string | null;
  onFailure: (error?: string) => void;
  onSuccess: (tx: DryRunTransactionBlockResponse) => void;
}
