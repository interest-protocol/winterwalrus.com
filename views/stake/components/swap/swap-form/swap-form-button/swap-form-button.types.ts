import { TxResult } from '@/utils/utils.types';

export interface SwapArgs {
  coinInType: string;
  coinOutType: string;
  coinInValue: bigint;
  coinOutValue: bigint;
  coinInNoFeeValue: bigint;
  onFailure: (error?: string) => void;
  onSuccess: (tx: TxResult) => void;
}
