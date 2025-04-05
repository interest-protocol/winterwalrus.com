import '@mysten/dapp-kit/dist/index.css';

import {
  ConnectModal,
  useCurrentAccount,
  useCurrentWallet,
  useDisconnectWallet,
  useSignPersonalMessage,
} from '@mysten/dapp-kit';
import { formatAddress } from '@mysten/sui/utils';
import { Button } from '@stylin.js/elements';
import { FC, useEffect } from 'react';
import Skeleton from 'react-loading-skeleton';
import { useLocalStorage } from 'usehooks-ts';

import { ChevronDownSVG, WalletSVG } from '../svg';

const Wallet: FC = () => {
  const disconnect = useDisconnectWallet();
  const currentAccount = useCurrentAccount();
  const { connectionStatus } = useCurrentWallet();

  const signMessage = useSignPersonalMessage();
  const [signedMessage, setSignedMessage] = useLocalStorage<{
    signature: string;
    bytes: string;
  } | null>('ww-signed-messages', null);

  useEffect(() => {
    if (signedMessage || !currentAccount) return;

    signMessage
      .mutateAsync({
        message: new TextEncoder().encode(
          'Please sign this to make sure verify your identity in our services.'
        ),
      })
      .then((response) => setSignedMessage(response));
  }, [currentAccount]);

  if (connectionStatus === 'connecting')
    return (
      <Button
        all="unset"
        py="1rem"
        gap="1rem"
        px="1.5rem"
        display="flex"
        bg="#99EFE41A"
        color="#F1F1F1"
        cursor="pointer"
        alignItems="center"
        borderRadius="0.75rem"
      >
        <Skeleton width="7rem" />
        <ChevronDownSVG maxWidth="0.65rem" maxHeight="0.65rem" width="100%" />
      </Button>
    );

  if (currentAccount)
    return (
      <Button
        all="unset"
        py="1rem"
        gap="1rem"
        px="1.5rem"
        display="flex"
        bg="#99EFE41A"
        color="#F1F1F1"
        cursor="pointer"
        alignItems="center"
        borderRadius="0.75rem"
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
          py="1rem"
          gap="1rem"
          px="1.5rem"
          bg="#99EFE4"
          display="flex"
          color="#000000"
          cursor="pointer"
          position="relative"
          alignItems="center"
          borderRadius="0.75rem"
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
