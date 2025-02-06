import '@mysten/dapp-kit/dist/index.css';

import {
  ConnectModal,
  useCurrentAccount,
  useDisconnectWallet,
} from '@mysten/dapp-kit';
import { formatAddress } from '@mysten/sui/utils';
import { Button, Div } from '@stylin.js/elements';
import { FC } from 'react';

import { LogoutSVG } from '../svg';

const Wallet: FC = () => {
  const disconnect = useDisconnectWallet();
  const currentAccount = useCurrentAccount();

  if (currentAccount)
    return (
      <Div
        p="0.2rem"
        cursor="pointer"
        borderRadius="5rem"
        background="linear-gradient(180deg, rgba(235, 235, 235, 0.10) -27.27%, rgba(196, 196, 196, 0.15) 127.27%)"
      >
        <Button
          all="unset"
          px="2rem"
          gap="1rem"
          display="flex"
          bg="#A8A8A81A"
          color="#F1F1F1"
          height="3.5rem"
          alignItems="center"
          borderRadius="5rem"
          onClick={() => disconnect.mutate()}
        >
          {formatAddress(currentAccount.address)}
          <LogoutSVG maxWidth="1rem" maxHeight="1rem" width="100%" />
        </Button>
      </Div>
    );

  return (
    <ConnectModal
      trigger={
        <Div
          cursor="pointer"
          position="relative"
          borderRadius="5rem"
          backdropFilter="blur(16px)"
          bg="linear-gradient(180deg, #99EFE4 0%, #1F8477 100%)"
        >
          <Div
            inset="0"
            position="absolute"
            borderRadius="5rem"
            backdropFilter="blur(16px)"
            bg="linear-gradient(180deg, #E2E2E255 0%, #E2E2E200 100%)"
          />
          <Button
            all="unset"
            px="2rem"
            m="0.2rem"
            color="#FDFDFD"
            height="3.5rem"
            borderRadius="5rem"
            position="relative"
            backdropFilter="blur(16px)"
            bg="linear-gradient(180deg, #99EFE4 0%, #1F8477 100%)"
          >
            Connect Wallet
          </Button>
        </Div>
      }
    />
  );
};

export default Wallet;
