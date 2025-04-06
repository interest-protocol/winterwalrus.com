import { useModal } from '@/hooks/use-modal';

import ConnectWalletModal from './connect-wallet-modal';

export const useConnectWalletModal = () => {
  const { setContent } = useModal();

  const handleOpenConnectModal = () =>
    setContent(<ConnectWalletModal />, {
      overlayProps: {
        alignItems: ['flex-end', 'center'],
      },
      containerProps: {
        display: 'flex',
        maxHeight: '90vh',
        maxWidth: ['100vw', '95vw'],
      },
    });

  return handleOpenConnectModal;
};
