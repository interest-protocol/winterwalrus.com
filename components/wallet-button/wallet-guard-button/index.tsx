import { useWalletConnection } from '@mysten/dapp-kit-react';
import { Button, ButtonProps } from '@stylin.js/elements';
import { FC } from 'react';

import { useConnectWalletModal } from '../connect-wallet/connect-wallet.hook';

const WalletGuardButton: FC<ButtonProps> = ({ children, ...props }) => {
  const { account, isConnecting } = useWalletConnection();
  const connectWalletModal = useConnectWalletModal();

  if (isConnecting)
    return (
      <Button {...props} onClick={undefined} disabled>
        Connecting...
      </Button>
    );

  // Ignore the form's disabled/error state: connecting must always be possible
  if (!account)
    return (
      <Button
        {...props}
        opacity={1}
        bg="#99EFE4"
        disabled={false}
        cursor="pointer"
        onClick={connectWalletModal}
        nHover={{ bg: '#74D5C9' }}
      >
        Connect Wallet
      </Button>
    );

  return <Button {...props}>{children}</Button>;
};

export default WalletGuardButton;
