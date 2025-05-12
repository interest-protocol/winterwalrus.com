import { BlizzardSDK } from '@interest-protocol/blizzard-sdk';
import useSWR from 'swr';
import { useReadLocalStorage } from 'usehooks-ts';

import { Network, RPC, RPC_MAP, RPC_STORAGE_KEY } from '@/constants';

const useBlizzardSdk = () => {
  const localRPC = useReadLocalStorage<RPC>(RPC_STORAGE_KEY) ?? RPC.Shinami;

  const { data } = useSWR<BlizzardSDK>(
    [useBlizzardSdk.name, localRPC, 'blizzard'],
    () => new BlizzardSDK({ fullNodeUrl: RPC_MAP[Network.MAINNET][localRPC] })
  );

  return data;
};

export default useBlizzardSdk;
