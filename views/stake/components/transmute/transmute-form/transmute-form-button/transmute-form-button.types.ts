import { DryRunTransactionBlockResponse } from '@mysten/sui/client';

export interface TransmuteArgs {
  coinInType: string;
  coinOutType: string;
  coinInValue: bigint;
  coinOutValue: bigint;
  onFailure: (error?: string) => void;
  onSuccess: (tx: DryRunTransactionBlockResponse) => void;
}
