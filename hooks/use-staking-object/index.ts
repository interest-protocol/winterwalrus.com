import { TYPES } from '@interest-protocol/blizzard-sdk';
import { useSuiClient } from '@mysten/dapp-kit';
import { normalizeStructTag } from '@mysten/sui/utils';
import { path, pathEq, pathOr } from 'ramda';
import useSWR from 'swr';

import { StakingObject } from '@/interface';

export const useStakingObject = (id?: string) => {
  const suiClient = useSuiClient();

  const { data, ...props } = useSWR<StakingObject | null>(
    [useStakingObject.name, id],
    async () => {
      if (!id) return null;

      const item = await suiClient.getObject({
        id,
        options: {
          showType: true,
          showContent: true,
          showDisplay: true,
        },
      });

      const lst = pathOr(
        '',
        ['data', 'content', 'fields', 'type_name', 'fields', 'name'],
        item
      );

      return {
        lst: lst ? normalizeStructTag(lst) : '',
        symbol: path(['data', 'content', 'fields', 'symbol'], item)
          ? `${path(['data', 'content', 'fields', 'symbol'], item)}`
          : 'StakedWAL',
        type: path(['data', 'type'], item) as string,
        objectId: path(['data', 'objectId'], item) as string,
        display: pathOr(null, ['data', 'display', 'data', 'image_url'], item),
        nodeId: pathOr(
          path(
            ['data', 'content', 'fields', 'inner', 'fields', 'node_id'],
            item
          ),
          ['data', 'content', 'fields', 'node_id'],
          item
        ) as string,
        principal: pathOr(
          path(
            ['data', 'content', 'fields', 'inner', 'fields', 'principal'],
            item
          ),
          ['data', 'content', 'fields', 'principal'],
          item
        ) as string,
        state: pathOr(
          path(
            [
              'data',
              'content',
              'fields',
              'inner',
              'fields',
              'state',
              'variant',
            ],
            item
          ),
          ['data', 'content', 'fields', 'state', 'variant'],
          item
        ) as string,
        withdrawEpoch: pathOr(
          null,
          ['data', 'content', 'fields', 'state', 'fields', 'withdraw_epoch'],
          item
        ),
        activationEpoch:
          Number(
            pathOr(
              path(
                [
                  'data',
                  'content',
                  'fields',
                  'inner',
                  'fields',
                  'inner',
                  'activation_epoch',
                ],
                item
              ),
              ['data', 'content', 'fields', 'activation_epoch'],
              item
            )
          ) -
          (pathEq(TYPES.BLIZZARD_STAKE_NFT, ['data', 'type'], item) ? 1 : 0),
      };
    },
    { refreshInterval: 5000 }
  );

  return {
    ...props,
    stakingObject: data,
  };
};
