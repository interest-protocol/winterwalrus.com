import { useWalletConnection } from '@mysten/dapp-kit-react';
import { Div } from '@stylin.js/elements';
import { FC } from 'react';

import { useModal } from '@/hooks/use-modal';

import WalletProfileItem from './wallet-profile-item';

const WalletProfileModal: FC = () => {
  const accounts = useWalletConnection().wallet?.accounts ?? [];
  const { handleClose } = useModal();

  return (
    <Div display="flex" flexDirection="column" gap="0.5rem">
      {accounts.map((account) => (
        <WalletProfileItem
          account={account}
          close={handleClose}
          key={account.address}
        />
      ))}
    </Div>
  );
};

export default WalletProfileModal;
