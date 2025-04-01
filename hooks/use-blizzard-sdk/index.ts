import { BlizzardSDK } from '@interest-protocol/blizzard-sdk';
import useSWR from 'swr';
import { useReadLocalStorage } from 'usehooks-ts';

import { Network, RPC, RPC_STORAGE_KEY } from '@/constants';

import { RPC_MAP } from './../../constants/rpc';

const useBlizzardSdk = () => {
  const localRPC = useReadLocalStorage<RPC>(RPC_STORAGE_KEY) ?? RPC.Shinami;

  const { data } = useSWR<BlizzardSDK>(
    [useBlizzardSdk.name, localRPC],
    () => new BlizzardSDK({ fullNodeUrl: RPC_MAP[Network.MAINNET][localRPC] })
  );

  return data;
};

export default useBlizzardSdk;
