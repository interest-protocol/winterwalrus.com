import { InterestStableSwapSDK } from '@interest-protocol/interest-stable-swap-sdk';
import useSWR from 'swr';
import { useReadLocalStorage } from 'usehooks-ts';

import { Network, RPC, RPC_MAP, RPC_STORAGE_KEY } from '@/constants';

const useInterestStableSdk = () => {
  const localRPC = useReadLocalStorage<RPC>(RPC_STORAGE_KEY) ?? RPC.Shinami;

  const { data } = useSWR<InterestStableSwapSDK>(
    [useInterestStableSdk.name, localRPC],
    () =>
      new InterestStableSwapSDK({
        fullNodeUrl: RPC_MAP[Network.MAINNET][localRPC],
      })
  );

  return data;
};

export default useInterestStableSdk;
