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

export interface UnstakeArgs {
  coinIn: string;
  coinValue: bigint;
  onFailure: (error?: string) => void;
  onSuccess: (tx: DryRunTransactionBlockResponse) => void;
}
