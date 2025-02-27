import {
  createNetworkConfig,
  SuiClientProvider,
  WalletProvider,
} from '@mysten/dapp-kit';
import { getFullnodeUrl } from '@mysten/sui/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { FC, PropsWithChildren } from 'react';

const queryClient = new QueryClient();

const Web3Provider: FC<PropsWithChildren> = ({ children }) => (
  <QueryClientProvider client={queryClient}>
    <SuiClientProvider
      defaultNetwork="testnet"
      networks={
        createNetworkConfig({
          testnet: { url: getFullnodeUrl('testnet') },
        }).networkConfig
      }
    >
      <WalletProvider autoConnect stashedWallet={{ name: 'Winter Walrus' }}>
        {children}
      </WalletProvider>
    </SuiClientProvider>
  </QueryClientProvider>
);

export default Web3Provider;
