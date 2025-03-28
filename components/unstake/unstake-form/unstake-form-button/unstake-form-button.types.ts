import { DryRunTransactionBlockResponse } from '@mysten/sui/client';

export interface UnstakeArgs {
  coinIn: string;
  coinValue: bigint;
  onFailure: (error?: string) => void;
  onSuccess: (tx: DryRunTransactionBlockResponse) => void;
}
