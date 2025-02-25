import { TYPES } from '@interest-protocol/blizzard-sdk';
import { useCurrentAccount, useSuiClient } from '@mysten/dapp-kit';
import { path, pathOr } from 'ramda';
import useSWR from 'swr';

import { isMoveObject } from '@/utils';

import { useNetwork } from '../use-network';

interface StakedObject {
  type: string;
  state: string;
  nodeId: string;
  objectId: string;
  principal: string;
  display: string | null;
  activationEpoch: number;
}

export const useStakingObjects = () => {
  const network = useNetwork();
  const suiClient = useSuiClient();
  const currentAccount = useCurrentAccount();

  const { data, ...props } = useSWR<ReadonlyArray<StakedObject>>(
    [useStakingObjects.name],
    async () => {
      if (!currentAccount) return [];

      const objects = await suiClient.getOwnedObjects({
        owner: currentAccount.address,
        filter: {
          MatchAny: [
            { StructType: TYPES[network].STAKED_WAL },
            { StructType: TYPES[network].BLIZZARD_STAKE_NFT },
          ],
        },
        options: {
          showType: true,
          showContent: true,
          showDisplay: true,
        },
      });

      return objects.data.reduce((acc, item) => {
        if (!isMoveObject(item?.data?.content)) return acc;

        return [
          ...acc,
          {
            objectId: path(['data', 'objectId'], item) as string,
            type: path(['data', 'type'], item) as string,
            display: pathOr(
              null,
              ['data', 'display', 'data', 'image_url'],
              item
            ),
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
            activationEpoch: Number(
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
            ),
          },
        ];
      }, [] as ReadonlyArray<StakedObject>);
    },
    { refreshInterval: 5000 }
  );

  return {
    ...props,
    stakingObjects: data,
  };
};
