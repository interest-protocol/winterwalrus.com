import '@mysten/dapp-kit/dist/index.css';

import { useCurrentAccount, useCurrentWallet } from '@mysten/dapp-kit';
import { Button, ButtonProps } from '@stylin.js/elements';
import { FC } from 'react';

import { useConnectWalletModal } from '../connect-wallet/connect-wallet.hook';

const WalletGuardButton: FC<ButtonProps> = ({ children, ...props }) => {
  const currentAccount = useCurrentAccount();
  const { connectionStatus } = useCurrentWallet();
  const connectWalletModal = useConnectWalletModal();

  if (connectionStatus === 'connecting')
    return (
      <Button {...props} onClick={undefined} disabled>
        Connecting...
      </Button>
    );

  if (!currentAccount)
    return (
      <Button {...props} onClick={connectWalletModal}>
        Connect Wallet
      </Button>
    );

  return <Button {...props}>{children}</Button>;
};

export default WalletGuardButton;
