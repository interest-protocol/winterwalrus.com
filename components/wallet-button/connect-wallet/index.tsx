import { Button, Span } from '@stylin.js/elements';
import { FC } from 'react';

import { WalletSVG } from '@/components/svg';

import { useConnectWalletModal } from './connect-wallet.hook';

const ConnectWallet: FC = () => {
  const connectWalletModal = useConnectWalletModal();

  return (
    <Button
      all="unset"
      bg="#EE2B5B"
      display="flex"
      color="#FFFFFF"
      cursor="pointer"
      position="relative"
      alignItems="center"
      borderRadius="0.75rem"
      fontWeight={500}
      gap={['0.5rem', '1rem']}
      py={['0.75rem', '1rem']}
      px={['0.75rem', '1.5rem']}
      backdropFilter="blur(16px)"
      onClick={connectWalletModal}
    >
      <WalletSVG
        maxWidth="1rem"
        maxHeight="1rem"
        width="100%"
        fontWeight={500}
      />
      <Span>
        Connect <Span display={['none', 'inline']}>Wallet</Span>
      </Span>
    </Button>
  );
};

export default ConnectWallet;
