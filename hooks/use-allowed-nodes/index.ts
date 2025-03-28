import { useSuiClient } from '@mysten/dapp-kit';
import { path } from 'ramda';
import useSWR from 'swr';

import useBlizzardSdk from '../use-blizzard-sdk';

interface Node {
  id: string;
  name: string;
}

export const useAllowedNodes = (stakingObject?: string) => {
  const suiClient = useSuiClient();
  const blizzardSdk = useBlizzardSdk();

  const { data: nodes, ...rest } = useSWR<ReadonlyArray<Node>>(
    [useAllowedNodes.name, stakingObject],
    async () => {
      if (!stakingObject) return [];

      const ids = await blizzardSdk.allowedNodes(stakingObject);

      const nodeObjects = await suiClient.multiGetObjects({
        ids,
        options: { showContent: true },
      });

      console.log({ nodeObjects });

      return nodeObjects.map((nodeObject) => ({
        id: path(['data', 'objectId'], nodeObject) as string,
        name: String(
          path(
            ['data', 'content', 'fields', 'node_info', 'fields', 'name'],
            nodeObject
          )
        ),
      }));
    }
  );

  return {
    ...rest,
    nodes,
  };
};
