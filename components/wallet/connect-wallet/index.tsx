import { Button, Span } from '@stylin.js/elements';
import { FC } from 'react';

import { WalletSVG } from '@/components/svg';
import { useModal } from '@/hooks/use-modal';

import ConnectWalletModal from './connect-wallet-modal';

const ConnectWallet: FC = () => {
  const { setContent } = useModal();

  const handleOpenConnectModal = () =>
    setContent(<ConnectWalletModal />, {
      overlayProps: {
        alignItems: ['flex-end', 'center'],
      },
      containerProps: {
        display: 'flex',
        maxHeight: '90vh',
        maxWidth: ['100vw', '95vw'],
      },
    });

  return (
    <Button
      all="unset"
      bg="#99EFE4"
      display="flex"
      color="#000000"
      cursor="pointer"
      position="relative"
      alignItems="center"
      borderRadius="0.75rem"
      gap={['0.5rem', '1rem']}
      py={['0.75rem', '1rem']}
      px={['0.75rem', '1.5rem']}
      backdropFilter="blur(16px)"
      onClick={handleOpenConnectModal}
    >
      <WalletSVG maxWidth="1rem" maxHeight="1rem" width="100%" />
      <Span>
        Connect <Span display={['none', 'inline']}>Wallet</Span>
      </Span>
    </Button>
  );
};

export default ConnectWallet;
