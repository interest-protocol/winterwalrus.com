import '@mysten/dapp-kit/dist/index.css';

import { useCurrentAccount, useCurrentWallet } from '@mysten/dapp-kit';
import { FC } from 'react';

import ConnectWallet from './connect-wallet';
import LoadingWallet from './loading-wallet';
import WalletProfile from './wallet-profile';

const Wallet: FC = () => {
  const currentAccount = useCurrentAccount();
  const { connectionStatus } = useCurrentWallet();

  if (connectionStatus === 'connecting') return <LoadingWallet />;

  if (currentAccount) return <WalletProfile />;

  return <ConnectWallet />;
};

export default Wallet;
