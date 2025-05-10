import { DryRunTransactionBlockResponse } from '@mysten/sui/client';

export interface SwapArgs {
  coinInType: string;
  coinOutType: string;
  coinInValue: bigint;
  coinOutValue: bigint;
  coinInNoFeeValue: bigint;
  onFailure: (error?: string) => void;
  onSuccess: (tx: DryRunTransactionBlockResponse) => void;
}
