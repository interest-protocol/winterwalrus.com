import { TYPES } from '@interest-protocol/blizzard-sdk';
import { useCurrentAccount, useSuiClient } from '@mysten/dapp-kit';
import { BigNumber } from 'bignumber.js';
import { path, pathOr } from 'ramda';
import useSWR from 'swr';

import { useNetwork } from '../use-network';

interface Response {
  principals: ReadonlyArray<string>;
  stakingObjectIds: ReadonlyArray<string>;
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
        return { principals: [], stakingObjectIds: [], principalByType: {} };

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

      console.log({ stakingObjects });

      return {
        principals: stakingObjects.map(
          (item) =>
            pathOr(
              path(['data', 'content', 'fields', 'value'], item),
              ['data', 'content', 'fields', 'principal'],
              item
            ) as string
        ),
        principalByType: stakingObjects.reduce(
          (acc, item) => {
            const type = path(['data', 'content', 'type'], item) as string;
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
