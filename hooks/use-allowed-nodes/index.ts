import { useSuiClient } from '@mysten/dapp-kit';
import { path } from 'ramda';
import useSWR from 'swr';

import { STAKING_OBJECT } from '@/constants';
import { Node } from '@/interface';

import useBlizzardSdk from '../use-blizzard-sdk';

export const useAllowedNodes = (lst?: string) => {
  const suiClient = useSuiClient();
  const blizzardSdk = useBlizzardSdk();

  const { data: nodes, ...rest } = useSWR<ReadonlyArray<Node>>(
    [useAllowedNodes.name, lst],
    async () => {
      if (!lst || !blizzardSdk) return [];
      const stakingObject = STAKING_OBJECT[lst];
      const ids = await blizzardSdk.allowedNodes(stakingObject);

      const nodeObjects = await suiClient.multiGetObjects({
        ids,
        options: { showContent: true },
      });

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
