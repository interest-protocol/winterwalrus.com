import { useCurrentClient } from '@mysten/dapp-kit-react';
import { useMemo } from 'react';

import { BlizzardClient } from '@/lib/blizzard';

const useBlizzardSdk = () => {
  const client = useCurrentClient();

  return useMemo(() => new BlizzardClient(client), [client]);
};

export default useBlizzardSdk;
