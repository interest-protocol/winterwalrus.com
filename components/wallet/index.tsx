import '@mysten/dapp-kit/dist/index.css';

import {
  useCurrentAccount,
  useCurrentWallet,
  useDisconnectWallet,
} from '@mysten/dapp-kit';
import { formatAddress } from '@mysten/sui/utils';
import { Button } from '@stylin.js/elements';
import { FC } from 'react';
import Skeleton from 'react-loading-skeleton';

import { useModal } from '@/hooks/use-modal';

import { ChevronDownSVG, WalletSVG } from '../svg';
import ConnectWalletModal from './connect-wallet-modal';

const Wallet: FC = () => {
  const { setContent } = useModal();
  const disconnect = useDisconnectWallet();
  const currentAccount = useCurrentAccount();
  const { connectionStatus } = useCurrentWallet();

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

  if (connectionStatus === 'connecting')
    return (
      <Button
        all="unset"
        display="flex"
        bg="#99EFE41A"
        color="#F1F1F1"
        cursor="pointer"
        alignItems="center"
        borderRadius="0.75rem"
        gap={['0.5rem', '1rem']}
        py={['0.75rem', '1rem']}
        px={['0.75rem', '1.5rem']}
      >
        <Skeleton width="7rem" />
        <ChevronDownSVG maxWidth="0.65rem" maxHeight="0.65rem" width="100%" />
      </Button>
    );

  if (currentAccount)
    return (
      <Button
        all="unset"
        display="flex"
        bg="#99EFE41A"
        color="#F1F1F1"
        cursor="pointer"
        alignItems="center"
        borderRadius="0.75rem"
        gap={['0.5rem', '1rem']}
        py={['0.75rem', '1rem']}
        px={['0.75rem', '1.5rem']}
        onClick={() => disconnect.mutate()}
      >
        {formatAddress(currentAccount.address)}
        <ChevronDownSVG maxWidth="0.65rem" maxHeight="0.65rem" width="100%" />
      </Button>
    );

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
      Connect Wallet
    </Button>
  );
};

export default Wallet;
