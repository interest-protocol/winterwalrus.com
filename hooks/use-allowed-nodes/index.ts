import { TYPES } from '@interest-protocol/blizzard-sdk';
import { useSuiClient } from '@mysten/dapp-kit';
import { useRouter } from 'next/router';
import { path } from 'ramda';
import useSWR from 'swr';

import { INTEREST_LABS, LST_TYPES_MAP, STAKING_OBJECT } from '@/constants';
import { Node } from '@/interface';

import useBlizzardSdk from '../use-blizzard-sdk';

export const useAllowedNodes = () => {
  const { query } = useRouter();
  const suiClient = useSuiClient();
  const blizzardSdk = useBlizzardSdk();

  const lst = LST_TYPES_MAP[String(query.lst).toUpperCase()] ?? TYPES.WWAL;

  const { data: nodes, ...rest } = useSWR<ReadonlyArray<Node>>(
    [useAllowedNodes.name, lst],
    async () => {
      if (!lst || !blizzardSdk) return [];

      const ids = await blizzardSdk.allowedNodes(STAKING_OBJECT[lst]);

      const nodeObjects = await suiClient.multiGetObjects({
        ids,
        options: { showContent: true },
      });

      return nodeObjects
        .map((nodeObject) => ({
          id: path(['data', 'objectId'], nodeObject) as string,
          name: String(
            path(
              ['data', 'content', 'fields', 'node_info', 'fields', 'name'],
              nodeObject
            )
          ),
        }))
        .toSorted((a, b) =>
          a.id === INTEREST_LABS && b.id !== INTEREST_LABS
            ? -1
            : b.id === INTEREST_LABS && a.id !== INTEREST_LABS
              ? 1
              : 0
        );
    }
  );

  return {
    ...rest,
    nodes,
  };
};
