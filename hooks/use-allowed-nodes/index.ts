import { useCurrentClient } from '@mysten/dapp-kit-react';
import { useRouter } from 'next/router';
import { path } from 'ramda';
import useSWR from 'swr';

import { INTEREST_LABS, LST_TYPES_MAP, STAKING_OBJECT } from '@/constants';
import { Node } from '@/interface';
import { TYPES } from '@/lib/blizzard';
import { getJsonObjects } from '@/lib/sui';

import useBlizzardSdk from '../use-blizzard-sdk';

export const useAllowedNodes = () => {
  const { query } = useRouter();
  const suiClient = useCurrentClient();
  const blizzardSdk = useBlizzardSdk();

  const lst = LST_TYPES_MAP[String(query.lst).toUpperCase()] ?? TYPES.WWAL;

  const { data: nodes, ...rest } = useSWR<ReadonlyArray<Node>>(
    [useAllowedNodes.name, lst, blizzardSdk],
    async () => {
      if (!lst || !blizzardSdk) return [];

      const ids = await blizzardSdk.allowedNodes(STAKING_OBJECT[lst]);

      const nodeObjects = await getJsonObjects(suiClient, ids);

      return nodeObjects
        .map((nodeObject) => ({
          id: nodeObject.objectId,
          name: String(path(['json', 'node_info', 'name'], nodeObject)),
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
