import { TYPES } from '@interest-protocol/blizzard-sdk';
import { useCurrentAccount, useSuiClient } from '@mysten/dapp-kit';
import { path, pathOr } from 'ramda';
import useSWR from 'swr';

import { useNetwork } from '../use-network';

interface Response {
  principals: ReadonlyArray<string>;
  stakingObjectIds: ReadonlyArray<string>;
}

export const useStakingObjects = () => {
  const network = useNetwork();
  const suiClient = useSuiClient();
  const currentAccount = useCurrentAccount();

  const { data, ...props } = useSWR<Response>(
    [useStakingObjects.name],
    async () => {
      if (!currentAccount) return { principals: [], stakingObjectIds: [] };

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

      return {
        principals: objects.data.map(
          (item) =>
            pathOr(
              path(
                ['data', 'content', 'fields', 'inner', 'fields', 'principal'],
                item
              ),
              ['data', 'content', 'fields', 'principal'],
              item
            ) as string
        ),
        stakingObjectIds: objects.data
          .sort((a, b) =>
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
          )
          .map((item) => path(['data', 'objectId'], item) as string),
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
