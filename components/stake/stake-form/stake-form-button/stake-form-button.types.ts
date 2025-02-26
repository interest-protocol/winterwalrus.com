import { DryRunTransactionBlockResponse } from '@mysten/sui/client';

export interface StakeArgs {
  nodeId: string;
  coinIn: string;
  coinOut: string;
  coinValue: bigint;
  isAfterVote: boolean;
  onFailure: (error?: string) => void;
  onSuccess: (tx: DryRunTransactionBlockResponse) => void;
}
