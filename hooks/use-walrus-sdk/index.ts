import { WalrusSDK } from '@interest-protocol/walrus-sdk';
import useSWR from 'swr';
import { useReadLocalStorage } from 'usehooks-ts';

import { Network, RPC, RPC_MAP, RPC_STORAGE_KEY } from '@/constants';

const useWalrusSdk = () => {
  const localRPC = useReadLocalStorage<RPC>(RPC_STORAGE_KEY) ?? RPC.Shinami;

  const { data } = useSWR<WalrusSDK>(
    [useWalrusSdk.name, localRPC, 'walrus'],
    () => new WalrusSDK({ fullNodeUrl: RPC_MAP[Network.MAINNET][localRPC] })
  );

  return data;
};

export default useWalrusSdk;
