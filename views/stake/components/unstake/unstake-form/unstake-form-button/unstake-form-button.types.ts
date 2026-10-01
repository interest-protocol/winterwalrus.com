import { TxResult } from '@/utils/utils.types';

export interface UnstakeArgs {
  coinIn: string;
  coinInValue: bigint;
  coinOutValue: bigint;
  onFailure: (error?: string) => void;
  onSuccess: (tx: TxResult) => void;
}
