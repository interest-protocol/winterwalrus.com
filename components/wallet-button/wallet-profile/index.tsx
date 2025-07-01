import { useCurrentAccount, useCurrentWallet } from '@mysten/dapp-kit';
import { formatAddress } from '@mysten/sui/utils';
import { Button, Div, DivElementProps, Img, Span } from '@stylin.js/elements';
import { AnimatePresence } from 'motion/react';
import { not } from 'ramda';
import { FC, useState } from 'react';

import { ChevronDownSVG } from '@/components/svg';
import useClickOutsideListenerRef from '@/hooks/use-click-outside-listener-ref';
import { useModal } from '@/hooks/use-modal';

import WalletProfileDropdown from './wallet-profile-dropdown';
import WalletProfileModal from './wallet-profile-modal';

const WalletProfile: FC = () => {
  const { setContent } = useModal();
  const currentWallet = useCurrentWallet();
  const [isOpen, setOpen] = useState(false);
  const currentAccount = useCurrentAccount();

  const menuRef = useClickOutsideListenerRef<DivElementProps>(() =>
    setOpen(false)
  );

  const handleOpenProfileDropdown = () => setOpen(not);
  const handleOpenProfileModal = () =>
    setContent(<WalletProfileModal />, { title: 'Wallet' });

  return (
    <>
      <Div
        ref={menuRef}
        alignItems="flex-end"
        flexDirection="column"
        display={['none', 'none', 'flex']}
      >
        <Button
          all="unset"
          py="0.75rem"
          gap="0.5rem"
          display="flex"
          bg="#99EFE41A"
          color="#F1F1F1"
          cursor="pointer"
          alignItems="center"
          borderRadius="0.5rem"
          px={['0.75rem', '1rem']}
          nHover={{ bg: '#99EFE433' }}
          onClick={handleOpenProfileDropdown}
        >
          <Img
            alt="Wallet"
            width="1.5rem"
            height="1.5rem"
            borderRadius="50%"
            src={currentWallet.currentWallet?.icon}
          />
          <Span whiteSpace="nowrap">
            {formatAddress(currentAccount!.address)}
          </Span>
          <Span display={['none', 'flex']} alignItems="center" ml="0.25rem">
            <ChevronDownSVG
              width="100%"
              maxWidth="0.65rem"
              maxHeight="0.65rem"
            />
          </Span>
        </Button>
        <AnimatePresence>
          {isOpen && <WalletProfileDropdown close={close} />}
        </AnimatePresence>
      </Div>
      <Button
        all="unset"
        gap="0.25rem"
        bg="#99EFE41A"
        color="#F1F1F1"
        cursor="pointer"
        alignItems="center"
        borderRadius="0.5rem"
        py={['0.625rem', '1rem']}
        px={['0.5rem', '1.5rem']}
        onClick={handleOpenProfileModal}
        fontSize={['0.75rem', '0.875rem']}
        display={['flex', 'flex', 'none']}
      >
        <Img
          alt="Wallet"
          width="1rem"
          height="1rem"
          borderRadius="50%"
          src={currentWallet.currentWallet?.icon}
        />
        {currentAccount!.address.slice(0, 4)}...
        {currentAccount!.address.slice(-4)}
        <Span display={['none', 'inline']}>
          <ChevronDownSVG maxWidth="0.65rem" maxHeight="0.65rem" width="100%" />
        </Span>
      </Button>
    </>
  );
};

export default WalletProfile;
