import { TxResult } from '@/utils/utils.types';

export interface LSTNFTsUnstakeArgs {
  coinIn: string;
  coinInValue: bigint;
  coinOutValue: bigint;
  onFailure: (error?: string) => void;
  onSuccess: (tx: TxResult) => void;
}
