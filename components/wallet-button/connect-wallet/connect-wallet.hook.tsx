import { useModal } from '@/hooks/use-modal';

import ConnectWalletModal from './connect-wallet-modal';

export const useConnectWalletModal = () => {
  const { setContent } = useModal();

  const handleOpenConnectModal = () =>
    setContent(<ConnectWalletModal />, { title: 'Connect Wallet' });

  return handleOpenConnectModal;
};
