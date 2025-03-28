import { DryRunTransactionBlockResponse } from '@mysten/sui/client';

export interface StakingAssetsItemProps {
  id?: string;
}

export interface UnstakeArgs {
  objectId: string;
  onFailure: (error?: string) => void;
  onSuccess: (tx: DryRunTransactionBlockResponse) => void;
}
