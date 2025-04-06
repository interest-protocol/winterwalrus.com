import { useAccounts } from '@mysten/dapp-kit';
import { AnimatePresence } from 'motion/react';
import { FC } from 'react';

import Motion from '@/components/motion';

import { WalletProfileDropdownProps } from './wallet-profile.types';
import WalletProfileItem from './wallet-profile-item';

const WalletProfileDropdown: FC<WalletProfileDropdownProps> = ({ close }) => {
  const accounts = useAccounts();

  return (
    <Motion
      py="1rem"
      zIndex="1"
      mt="4.25rem"
      gap="0.5rem"
      width="20rem"
      bg="#FFFFFF0D"
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
      display={['none', 'none', 'flex']}
      onClick={(e) => e.stopPropagation()}
    >
      <AnimatePresence>
        {accounts.map((account) => (
          <WalletProfileItem
            close={close}
            account={account}
            key={account.address}
          />
        ))}
      </AnimatePresence>
    </Motion>
  );
};

export default WalletProfileDropdown;
