import { TYPES } from '@interest-protocol/blizzard-sdk';
import { useCurrentAccount, useSuiClient } from '@mysten/dapp-kit';
import { normalizeStructTag } from '@mysten/sui/utils';
import { BigNumber } from 'bignumber.js';
import { path, pathOr } from 'ramda';
import useSWR from 'swr';

import { useNetwork } from '../use-network';

interface Response {
  stakingObjectIds: ReadonlyArray<string>;
  objectsActivation: Record<string, number>;
  principalByType: Record<string, BigNumber>;
}

export const useStakingObjects = () => {
  const network = useNetwork();
  const suiClient = useSuiClient();
  const currentAccount = useCurrentAccount();

  const { data, ...props } = useSWR<Response>(
    [useStakingObjects.name],
    async () => {
      if (!currentAccount)
        return {
          stakingObjectIds: [],
          principalByType: {},
          objectsActivation: {},
        };

      const objects = await suiClient.getOwnedObjects({
        owner: currentAccount.address,
        options: { showContent: true },
        filter: {
          MatchAny: [
            { StructType: TYPES[network].STAKED_WAL },
            { StructType: TYPES[network].BLIZZARD_STAKE_NFT },
          ],
        },
      });

      const stakingObjects = objects.data.sort((a, b) =>
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
              a
            ),
            ['data', 'content', 'fields', 'activation_epoch'],
            a
          )
        ) <
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
              b
            ),
            ['data', 'content', 'fields', 'activation_epoch'],
            b
          )
        )
          ? -1
          : 1
      );

      return {
        objectsActivation: stakingObjects.reduce(
          (acc, item) => {
            const type = normalizeStructTag(
              path(['data', 'content', 'type'], item) as string
            );
            const value = Number(
              pathOr(
                null,
                [
                  'data',
                  'content',
                  'fields',
                  'state',
                  'fields',
                  'withdraw_epoch',
                ],
                item
              ) ??
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
            );

            return {
              ...acc,
              [type]: value,
            };
          },
          {} as Record<string, number>
        ),
        principalByType: stakingObjects.reduce(
          (acc, item) => {
            const type = normalizeStructTag(
              path(['data', 'content', 'type'], item) as string
            );
            const value = BigNumber(
              pathOr(
                path(['data', 'content', 'fields', 'value'], item),
                ['data', 'content', 'fields', 'principal'],
                item
              ) as string
            );

            return {
              ...acc,
              [type]: acc[type] ? acc[type].plus(value) : value,
            };
          },
          {} as Record<string, BigNumber>
        ),
        stakingObjectIds: stakingObjects.map(
          (item) => path(['data', 'objectId'], item) as string
        ),
      };
    },
    {
      refreshInterval: 5000,
    }
  );

  return {
    ...props,
    ...data,
  };
};
