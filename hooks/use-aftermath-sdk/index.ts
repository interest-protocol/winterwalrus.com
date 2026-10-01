import { Aftermath, AftermathApi } from 'aftermath-ts-sdk';
import useSWR from 'swr';
import { useReadLocalStorage } from 'usehooks-ts';

import { getRpcUrl, Network, RPC_STORAGE_KEY } from '@/constants';
import { createSuiClient } from '@/lib/sui';

const useAftermathSdk = () => {
  const fullnodeUrl = getRpcUrl(
    Network.MAINNET,
    useReadLocalStorage<string>(RPC_STORAGE_KEY)
  );

  const { data } = useSWR<Aftermath>(
    [useAftermathSdk.name, 'aftermath', fullnodeUrl],
    async () => {
      // Aftermath.create() also builds a JSON-RPC client by default, so a
      // gRPC-only API is injected instead
      const addresses = await (
        await Aftermath.create({
          network: 'MAINNET',
          api: {} as AftermathApi,
        })
      ).getAddresses();

      return Aftermath.create({
        fullnodeUrl,
        network: 'MAINNET',
        api: new AftermathApi(
          createSuiClient(Network.MAINNET, fullnodeUrl),
          addresses
        ),
      });
    }
  );

  return data;
};

export default useAftermathSdk;
