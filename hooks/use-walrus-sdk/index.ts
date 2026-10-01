import { useCurrentClient } from '@mysten/dapp-kit-react';
import { useMemo } from 'react';

import { WalrusClient } from '@/lib/blizzard';

const useWalrusSdk = () => {
  const client = useCurrentClient();

  return useMemo(() => new WalrusClient(client), [client]);
};

export default useWalrusSdk;
