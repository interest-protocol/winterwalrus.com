import { WalletAccount } from '@mysten/wallet-standard';

export interface WalletProfileItemProps {
  close: () => void;
  account: WalletAccount;
}

export interface WalletProfileItemProps {
  close: () => void;
  account: WalletAccount;
}

export interface WalletProfileDropdownProps
  extends Pick<WalletProfileItemProps, 'close'> {}
