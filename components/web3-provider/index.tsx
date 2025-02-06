import {
  createNetworkConfig,
  SuiClientProvider,
  WalletProvider,
} from '@mysten/dapp-kit';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { FC, PropsWithChildren } from 'react';

const RPC = 'https://fullnode.mainnet.sui.io:443';

const queryClient = new QueryClient();

const Web3Provider: FC<PropsWithChildren> = ({ children }) => (
  <QueryClientProvider client={queryClient}>
    <SuiClientProvider
      defaultNetwork="testnet"
      networks={
        createNetworkConfig({
          testnet: { url: RPC },
        }).networkConfig
      }
    >
      <WalletProvider autoConnect stashedWallet={{ name: 'walrus' }}>
        {children}
      </WalletProvider>
    </SuiClientProvider>
  </QueryClientProvider>
);

export default Web3Provider;
