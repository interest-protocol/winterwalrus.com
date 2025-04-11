import { DryRunTransactionBlockResponse } from '@mysten/sui/client';

export interface SwapArgs {
  nodeId: string;
  coinIn: string;
  coinOut: string;
  coinValue: bigint;
  isAfterVote: boolean;
  onFailure: (error?: string) => void;
  onSuccess: (tx: DryRunTransactionBlockResponse) => void;
}
