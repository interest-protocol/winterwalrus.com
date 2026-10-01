import { useCurrentClient } from '@mysten/dapp-kit-react';
import { normalizeStructTag } from '@mysten/sui/utils';
import { path, pathOr } from 'ramda';
import useSWR from 'swr';

import { StakingObject } from '@/interface';
import { TYPES } from '@/lib/blizzard';

export const useStakingObject = (id?: string) => {
  const suiClient = useCurrentClient();

  const { data, ...props } = useSWR<StakingObject | null>(
    [useStakingObject.name, id],
    async () => {
      if (!id) return null;

      const { object } = await suiClient.getObject({
        objectId: id,
        include: { json: true, display: true },
      });

      const json = object.json ?? {};
      const type = normalizeStructTag(object.type);

      const lst = pathOr('', ['type_name'], json);

      return {
        lst: lst ? normalizeStructTag(lst) : '',
        symbol: path(['symbol'], json)
          ? `${path(['symbol'], json)}`
          : 'StakedWAL',
        type,
        objectId: object.objectId,
        display: pathOr(null, ['output', 'image_url'], object.display) as
          | string
          | null,
        nodeId: pathOr(
          path(['inner', 'node_id'], json),
          ['node_id'],
          json
        ) as string,
        principal: pathOr(
          path(['inner', 'principal'], json),
          ['principal'],
          json
        ) as string,
        state: pathOr(
          path(['inner', 'state', '@variant'], json),
          ['state', '@variant'],
          json
        ) as string,
        withdrawEpoch: pathOr(null, ['state', 'withdraw_epoch'], json),
        activationEpoch:
          Number(
            pathOr(
              path(['inner', 'activation_epoch'], json),
              ['activation_epoch'],
              json
            )
          ) - (type === TYPES.BLIZZARD_STAKE_NFT ? 1 : 0),
      };
    },
    { refreshInterval: 5000 }
  );

  return {
    ...props,
    stakingObject: data,
  };
};
