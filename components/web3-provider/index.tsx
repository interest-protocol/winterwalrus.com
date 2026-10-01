import { DAppKitProvider } from '@mysten/dapp-kit-react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { FC, PropsWithChildren, useEffect, useState } from 'react';
import { useReadLocalStorage } from 'usehooks-ts';

import { getRpc, RPC_STORAGE_KEY } from '@/constants';
import { getAppDAppKit } from '@/lib/sui/dapp-kit';

const queryClient = new QueryClient();

const Web3Provider: FC<PropsWithChildren> = ({ children }) => {
  const rpc = getRpc(useReadLocalStorage<string>(RPC_STORAGE_KEY));
  const [dAppKit, setDAppKit] = useState(() => getAppDAppKit(rpc));

  // Switching RPC creates a new dApp kit, which must not happen during render
  useEffect(() => {
    setDAppKit(getAppDAppKit(rpc));
  }, [rpc]);

  return (
    <QueryClientProvider client={queryClient}>
      <DAppKitProvider dAppKit={dAppKit}>{children}</DAppKitProvider>
    </QueryClientProvider>
  );
};

export default Web3Provider;
