import { useCurrentAccount, useCurrentClient } from '@mysten/dapp-kit-react';
import { normalizeStructTag } from '@mysten/sui/utils';
import { BigNumber } from 'bignumber.js';
import { path, pathOr } from 'ramda';
import useSWR from 'swr';

import { TYPES } from '@/lib/blizzard';
import { JsonObject, listOwnedJsonObjects } from '@/lib/sui';
import { ZERO_BIG_NUMBER } from '@/utils';

interface Response {
  stakingObjectIds: ReadonlyArray<string>;
  objectsActivation: Record<string, number>;
  principalByType: Record<string, BigNumber>;
  balancesByLst: Record<string, BigNumber>;
}

const activationEpochOf = ({ json }: JsonObject) =>
  Number(
    pathOr(
      path(['inner', 'activation_epoch'], json),
      ['activation_epoch'],
      json
    )
  );

export const useStakingObjects = (type?: string) => {
  const suiClient = useCurrentClient();
  const currentAccount = useCurrentAccount();

  const { data, ...props } = useSWR<Response>(
    [useStakingObjects.name, currentAccount?.address, type],
    async () => {
      if (!currentAccount)
        return {
          balancesByLst: {},
          principalByType: {},
          stakingObjectIds: [],
          objectsActivation: {},
        };

      const objects = await listOwnedJsonObjects(
        suiClient,
        currentAccount.address,
        type
      );

      const stakingObjects = [...objects].sort((a, b) =>
        activationEpochOf(a) < activationEpochOf(b) ? -1 : 1
      );

      const stakingObjectIds = stakingObjects.map(({ objectId }) => objectId);

      const principalByType = stakingObjects.reduce(
        (acc, item) => {
          const type = normalizeStructTag(item.type);

          const value = BigNumber(
            pathOr(
              path(['inner', 'principal'], item.json),
              ['principal'],
              item.json
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
        (acc, item) => {
          if (normalizeStructTag(item.type) !== TYPES.BLIZZARD_STAKE_NFT)
            return acc;

          const lstType = `nft:${normalizeStructTag(
            String(path(['type_name'], item.json))
          )}`;

          return {
            ...acc,
            [lstType]: BigNumber(String(path(['value'], item.json))).plus(
              acc[lstType] ?? ZERO_BIG_NUMBER
            ),
          };
        },
        {} as Record<string, BigNumber>
      );

      const objectsActivation = stakingObjects.reduce(
        (acc, item) => {
          const type = normalizeStructTag(item.type);

          const value = Number(
            pathOr(null, ['state', 'withdraw_epoch'], item.json) ??
              activationEpochOf(item)
          );

          return {
            ...acc,
            [item.objectId]:
              value - (type === TYPES.BLIZZARD_STAKE_NFT ? 1 : 0),
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

  return {
    ...props,
    ...data,
  };
};
