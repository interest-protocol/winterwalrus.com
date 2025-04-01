import { BlizzardSDK } from '@interest-protocol/blizzard-sdk';
import useSWR from 'swr';
import { useReadLocalStorage } from 'usehooks-ts';

import { RPC, RPC_STORAGE_KEY } from '@/constants';

const useBlizzardSdk = () => {
  const localRPC = useReadLocalStorage<RPC>(RPC_STORAGE_KEY) ?? RPC.Shinami;

  const { data } = useSWR<BlizzardSDK>(
    [useBlizzardSdk.name, localRPC],
    () => new BlizzardSDK({ fullNodeUrl: localRPC })
  );

  return data;
};

export default useBlizzardSdk;
