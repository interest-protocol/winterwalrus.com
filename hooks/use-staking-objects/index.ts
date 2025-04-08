import { TYPES } from '@interest-protocol/blizzard-sdk';
import { useCurrentAccount, useSuiClient } from '@mysten/dapp-kit';
import { normalizeStructTag } from '@mysten/sui/utils';
import { BigNumber } from 'bignumber.js';
import { path, pathEq, pathOr } from 'ramda';
import useSWR from 'swr';

import { ZERO_BIG_NUMBER } from '@/utils';

interface Response {
  stakingObjectIds: ReadonlyArray<string>;
  objectsActivation: Record<string, number>;
  principalByType: Record<string, BigNumber>;
  balancesByLst: Record<string, BigNumber>;
}

export const useStakingObjects = () => {
  const suiClient = useSuiClient();
  const currentAccount = useCurrentAccount();

  const { data, ...props } = useSWR<Response>(
    [useStakingObjects.name, currentAccount],
    async () => {
      if (!currentAccount)
        return {
          balancesByLst: {},
          principalByType: {},
          stakingObjectIds: [],
          objectsActivation: {},
        };

      const objects = await suiClient.getOwnedObjects({
        owner: currentAccount.address,
        options: { showContent: true, showType: true },
        filter: {
          MatchAny: [
            { StructType: TYPES.STAKED_WAL },
            { StructType: TYPES.BLIZZARD_STAKE_NFT },
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
      const stakingObjectIds = stakingObjects.map(
        (item) => path(['data', 'objectId'], item) as string
      );

      const principalByType = stakingObjects.reduce(
        (acc, item) => {
          const type = normalizeStructTag(
            path(['data', 'content', 'type'], item) as string
          );

          const value = BigNumber(
            pathOr(
              path(
                ['data', 'content', 'fields', 'inner', 'fields', 'principal'],
                item
              ),
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
      );

      const balancesByLst = stakingObjects.reduce(
        (acc, data) => {
          if (!pathEq(TYPES.BLIZZARD_STAKE_NFT, ['data', 'type'], data))
            return acc;

          const lstType = `nft:${normalizeStructTag(
            String(
              path(
                ['data', 'content', 'fields', 'type_name', 'fields', 'name'],
                data
              )
            )
          )}`;

          return {
            ...acc,
            [lstType]: BigNumber(
              String(path(['data', 'content', 'fields', 'value'], data))
            ).plus(acc[lstType] ?? ZERO_BIG_NUMBER),
          };
        },
        {} as Record<string, BigNumber>
      );
      const objectsActivation = stakingObjects.reduce(
        (acc, item) => {
          const id = path(['data', 'objectId'], item) as string;

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
            [id]: value - (type === TYPES.BLIZZARD_STAKE_NFT ? 1 : 0),
          };
        },
        {} as Record<string, number>
      );

      return {
        balancesByLst,
        principalByType,
        stakingObjectIds,
        objectsActivation,
      };
    },
    {
      refreshInterval: 5000,
    }
  );

  console.log({ error: props.error });

  return {
    ...props,
    ...data,
  };
};
