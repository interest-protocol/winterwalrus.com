import { UiWalletAccount } from '@mysten/dapp-kit-react';

export interface WalletProfileItemProps {
  close: () => void;
  account: UiWalletAccount;
}

export interface WalletProfileItemProps {
  close: () => void;
  account: UiWalletAccount;
}

export interface WalletProfileDropdownProps extends Pick<
  WalletProfileItemProps,
  'close'
> {}
