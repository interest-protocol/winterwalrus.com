import { useSuiClient } from '@mysten/dapp-kit';
import { path } from 'ramda';
import useSWR from 'swr';

export const useNodeName = (id?: string) => {
  const suiClient = useSuiClient();

  const { data, ...rest } = useSWR<string | null>(
    [useNodeName.name, id],
    async () => {
      if (!id) return null;

      const nodeObject = await suiClient.getObject({
        id,
        options: { showContent: true },
      });

      return String(
        path(
          ['data', 'content', 'fields', 'node_info', 'fields', 'name'],
          nodeObject
        )
      );
    }
  );

  return {
    ...rest,
    nodeName: data,
  };
};
