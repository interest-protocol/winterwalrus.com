import { useCurrentClient } from '@mysten/dapp-kit-react';
import { path } from 'ramda';
import useSWR from 'swr';

import { getJsonObject } from '@/lib/sui';

export const useNodeName = (id?: string) => {
  const suiClient = useCurrentClient();

  const { data, ...rest } = useSWR<string | null>(
    [useNodeName.name, id],
    async () => {
      if (!id) return null;

      const nodeObject = await getJsonObject(suiClient, id);

      return String(path(['json', 'node_info', 'name'], nodeObject));
    }
  );

  return {
    ...rest,
    nodeName: data,
  };
};
