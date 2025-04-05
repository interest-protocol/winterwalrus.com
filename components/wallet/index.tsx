import '@mysten/dapp-kit/dist/index.css';

import {
  ConnectModal,
  useCurrentAccount,
  useCurrentWallet,
  useDisconnectWallet,
} from '@mysten/dapp-kit';
import { formatAddress } from '@mysten/sui/utils';
import { Button } from '@stylin.js/elements';
import { FC } from 'react';
import Skeleton from 'react-loading-skeleton';

import { ChevronDownSVG, WalletSVG } from '../svg';

const Wallet: FC = () => {
  const disconnect = useDisconnectWallet();
  const currentAccount = useCurrentAccount();
  const { connectionStatus } = useCurrentWallet();

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
    <ConnectModal
      trigger={
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
        >
          <WalletSVG maxWidth="1rem" maxHeight="1rem" width="100%" />
          Connect Wallet
        </Button>
      }
    />
  );
};

export default Wallet;
