import type { UiWalletAccount } from '@mysten/dapp-kit-react';
import type { SuiClientTypes } from '@mysten/sui/client';
import type { Transaction } from '@mysten/sui/transactions';

import type { SuiClient } from '@/lib/sui';
import type { AppDAppKit } from '@/lib/sui/dapp-kit';

export interface TxResult {
  digest: string;
  deletedObjectIds: ReadonlyArray<string>;
  balanceChanges: ReadonlyArray<SuiClientTypes.BalanceChange>;
  createdObjects: ReadonlyArray<{ objectId: string; objectType: string }>;
}

export interface SignAndExecuteArgs {
  tx: Transaction;
  client: SuiClient;
  dAppKit: AppDAppKit;
  currentAccount: UiWalletAccount;
  fallback?: (arg?: string) => void;
  callback?: (arg: TxResult) => void;
}
