import { useDAppKit, useWallets } from '@mysten/dapp-kit-react';
import { Div, Img } from '@stylin.js/elements';
import { FC } from 'react';
import unikey from 'unikey';

import { useModal } from '@/hooks/use-modal';

const ConnectWalletModal: FC = () => {
  const wallets = useWallets();
  const dAppKit = useDAppKit();
  const { handleClose } = useModal();

  return (
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
            dAppKit.connectWallet({ wallet });
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
  );
};

export default ConnectWalletModal;
