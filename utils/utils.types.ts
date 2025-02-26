import type { useSignTransaction } from '@mysten/dapp-kit';
import type {
  DryRunTransactionBlockResponse,
  SuiClient,
  SuiTransactionBlockResponse,
  SuiTransactionBlockResponseOptions,
} from '@mysten/sui/client';
import type { Transaction } from '@mysten/sui/transactions';
import type { WalletAccount } from '@mysten/wallet-standard';

export interface GetCoinOfValueArgs {
  tx: Transaction;
  account: string;
  coinType: string;
  coinValue: bigint;
  client: SuiClient;
}

export interface TimedSuiTransactionBlockResponse
  extends SuiTransactionBlockResponse {
  time: number;
}

export interface SignAndExecuteArgs {
  tx: Transaction;
  client: SuiClient;
  currentAccount: WalletAccount;
  fallback?: (arg?: string) => void;
  options?: SuiTransactionBlockResponseOptions;
  signTransaction: ReturnType<typeof useSignTransaction>;
  callback?: (arg: DryRunTransactionBlockResponse) => void;
}

export interface WaitForTxArgs {
  digest: string;
  timeout?: number;
  client: SuiClient;
  pollInterval?: number;
}
