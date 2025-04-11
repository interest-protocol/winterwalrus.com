import { DryRunTransactionBlockResponse } from '@mysten/sui/client';

export interface UnstakeArgs {
  coinIn: string;
  coinInValue: bigint;
  coinOutValue: bigint;
  onFailure: (error?: string) => void;
  onSuccess: (tx: DryRunTransactionBlockResponse) => void;
}
