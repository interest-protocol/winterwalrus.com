import { TxResult } from '@/utils/utils.types';

export interface StakingAssetsItemProps {
  id?: string;
}

export interface BurnArgs {
  lst: string;
  objectId: string;
  onFailure: (error?: string) => void;
  onSuccess: (tx: TxResult) => void;
}

export interface UnstakeArgs {
  objectId: string;
  canWithdrawEarly?: boolean;
  onFailure: (error?: string) => void;
  onSuccess: (tx: TxResult) => void;
}

export interface StakingAssetItemModalProps {
  mode: 'unstake' | 'withdraw';
  onClick: () => void;
}
