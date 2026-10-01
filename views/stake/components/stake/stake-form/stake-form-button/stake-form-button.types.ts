import { TxResult } from '@/utils/utils.types';

export interface StakeArgs {
  nodeId: string;
  coinIn: string;
  coinOut: string;
  coinValue: bigint;
  isAfterVote: boolean;
  onFailure: (error?: string) => void;
  onSuccess: (tx: TxResult) => void;
}

export interface StakingAssetsItemNFTModalProps {
  onProceed: () => void;
}
