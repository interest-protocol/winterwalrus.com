import { TxResult } from '@/utils/utils.types';

export interface TransmuteArgs {
  coinInType: string;
  coinOutType: string;
  coinInValue: bigint;
  coinOutValue: bigint;
  onFailure: (error?: string) => void;
  onSuccess: (tx: TxResult) => void;
}
