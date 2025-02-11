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
          height="2.8rem"
          color="#F1F1F1"
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
        >
          <Div
            inset="0"
            position="absolute"
            borderRadius="5rem"
            backdropFilter="blur(16px)"
          />
          <Button
            all="unset"
            px="2rem"
            m="0.2rem"
            color="#0C0F1D"
            height="2.8rem"
            borderRadius="5rem"
            position="relative"
            backdropFilter="blur(16px)"
            bg="linear-gradient(0deg, #99EFE4 15.38%, rgba(153, 239, 228, 0.50) 83.65%)"
          >
            Connect
          </Button>
        </Div>
      }
    />
  );
};

export default Wallet;
