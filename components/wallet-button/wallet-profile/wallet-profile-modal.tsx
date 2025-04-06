import { useAccounts } from '@mysten/dapp-kit';
import { Div, P, Span } from '@stylin.js/elements';
import { FC } from 'react';

import { useModal } from '@/hooks/use-modal';

import WalletProfileItem from './wallet-profile-item';

const WalletProfileModal: FC = () => {
  const accounts = useAccounts();
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
          Wallet
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
        {accounts.map((account) => (
          <WalletProfileItem
            account={account}
            close={handleClose}
            key={account.address}
          />
        ))}
      </Div>
    </Div>
  );
};

export default WalletProfileModal;
