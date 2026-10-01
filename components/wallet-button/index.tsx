import { useWalletConnection } from '@mysten/dapp-kit-react';
import { FC } from 'react';

import ConnectWallet from './connect-wallet';
import LoadingWallet from './loading-wallet';
import WalletProfile from './wallet-profile';

const WalletButton: FC = () => {
  const { account, isConnecting } = useWalletConnection();

  if (isConnecting) return <LoadingWallet />;

  if (account) return <WalletProfile />;

  return <ConnectWallet />;
};

export default WalletButton;
