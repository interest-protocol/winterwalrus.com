import { useAccounts } from '@mysten/dapp-kit';
import { AnimatePresence } from 'motion/react';
import { FC } from 'react';

import Motion from '@/components/motion';

import WalletProfileDropdownItem from './wallet-profile-dropdown-item';

const WalletProfileDropdown: FC = () => {
  const accounts = useAccounts();

  return (
    <Motion
      py="1rem"
      zIndex="1"
      mt="4.25rem"
      gap="0.5rem"
      bg="#FFFFFF0D"
      display="flex"
      color="#ffffff"
      overflow="hidden"
      position="absolute"
      borderRadius="1rem"
      exit={{ scaleY: 0 }}
      flexDirection="column"
      style={{ originY: 0 }}
      backdropFilter="blur(50px)"
      right={['0.5rem', 'unset']}
      animate={{ scaleY: [0, 1] }}
      border="1px solid #FFFFFF1A"
      onClick={(e) => e.stopPropagation()}
    >
      <AnimatePresence>
        {accounts.map((account) => (
          <WalletProfileDropdownItem key={account.address} account={account} />
        ))}
      </AnimatePresence>
    </Motion>
  );
};

export default WalletProfileDropdown;
