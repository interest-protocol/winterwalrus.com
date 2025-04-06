import { useCurrentAccount, useCurrentWallet } from '@mysten/dapp-kit';
import { formatAddress } from '@mysten/sui/utils';
import { Button, Div, DivElementProps, Img, Span } from '@stylin.js/elements';
import { AnimatePresence } from 'motion/react';
import { not } from 'ramda';
import { FC, useState } from 'react';

import { ChevronDownSVG } from '@/components/svg';
import useClickOutsideListenerRef from '@/hooks/use-click-outside-listener-ref';

import WalletProfileDropdown from './wallet-profile-dropdown';

const WalletProfile: FC = () => {
  const currentWallet = useCurrentWallet();
  const [isOpen, setOpen] = useState(false);
  const currentAccount = useCurrentAccount();

  const menuRef = useClickOutsideListenerRef<DivElementProps>(() =>
    setOpen(false)
  );

  const handleOpenProfileDropdown = () => setOpen(not);

  return (
    <Div
      ref={menuRef}
      display="flex"
      alignItems="flex-end"
      flexDirection="column"
    >
      <Button
        all="unset"
        gap="0.5rem"
        display="flex"
        bg="#99EFE41A"
        color="#F1F1F1"
        cursor="pointer"
        alignItems="center"
        borderRadius="0.75rem"
        py={['0.75rem', '1rem']}
        px={['0.75rem', '1.5rem']}
        onClick={handleOpenProfileDropdown}
      >
        <Img
          alt="Wallet"
          width="1.5rem"
          height="1.5rem"
          borderRadius="50%"
          src={currentWallet.currentWallet?.icon}
        />
        {formatAddress(currentAccount!.address)}
        <Span display={['none', 'inline']}>
          <ChevronDownSVG maxWidth="0.65rem" maxHeight="0.65rem" width="100%" />
        </Span>
      </Button>
      <AnimatePresence>{isOpen && <WalletProfileDropdown />}</AnimatePresence>
    </Div>
  );
};

export default WalletProfile;
