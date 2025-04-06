import { useConnectWallet, useWallets } from '@mysten/dapp-kit';
import { Div, Img, P, Span } from '@stylin.js/elements';
import { FC } from 'react';
import unikey from 'unikey';

import { useModal } from '@/hooks/use-modal';

const ConnectWalletModal: FC = () => {
  const wallets = useWallets();
  const connect = useConnectWallet();
  const { handleClose } = useModal();

  return (
    <Div
      p="1.5rem"
      gap="1.5rem"
      color="#ffffff"
      display="flex"
      lineHeight="160%"
      textAlign="center"
      fontSize="0.875rem"
      borderRadius="1rem"
      flexDirection="column"
      width={['100vw', '26rem']}
      backdropFilter="blur(20px)"
      bg="rgba(255, 255, 255, 0.10)"
    >
      <Div display="flex" justifyContent="space-between" alignItems="center">
        <P fontSize="1.25rem" fontWeight="600">
          Connect Wallet
        </P>
        <Span
          py="0.25rem"
          px="0.75rem"
          bg="#FFFFFF1A"
          display="flex"
          fontWeight="500"
          cursor="pointer"
          borderRadius="0.5rem"
          onClick={handleClose}
        >
          ESC
        </Span>
      </Div>
      <Div display="flex" flexDirection="column" gap="0.5rem">
        {wallets.map((wallet) => (
          <Div
            p="1rem"
            gap="1rem"
            key={unikey()}
            display="flex"
            cursor="pointer"
            border="1px solid"
            alignItems="center"
            borderRadius="1rem"
            borderColor="#FFFFFF1A"
            nHover={{ borderColor: '#99EFE44D' }}
            onClick={() => {
              connect.mutateAsync({ wallet });
              handleClose();
            }}
          >
            <Img
              width="2.5rem"
              height="2.5rem"
              src={wallet.icon}
              alt={wallet.name}
              borderRadius="0.625rem"
            />
            {wallet.name}
          </Div>
        ))}
      </Div>
    </Div>
  );
};

export default ConnectWalletModal;
