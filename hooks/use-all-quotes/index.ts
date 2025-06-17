import { BigNumber } from 'bignumber.js';
import useSWR from 'swr';

import { LST_TYPES, STAKING_OBJECT } from '@/constants';
import { FixedPointMath } from '@/lib/entities/fixed-point-math';

import useBlizzardSdk from '../use-blizzard-sdk';
import useEpochData from '../use-epoch-data';

export const useAllQuotes = () => {
  const blizzardSdk = useBlizzardSdk();
  const { data: epoch } = useEpochData();

  return useSWR<Record<string, number>>(
    [useAllQuotes.name, epoch?.currentEpoch, blizzardSdk],
    async () => {
      if (!epoch || !blizzardSdk) return {};

      const quotes = await Promise.all(
        LST_TYPES.map((type) =>
          blizzardSdk
            .toLstAtEpoch({
              epoch: epoch?.currentEpoch,
              blizzardStaking: STAKING_OBJECT[type],
              value: BigInt(FixedPointMath.toBigNumber(1).toString()),
            })
            .then((value) => FixedPointMath.toNumber(BigNumber(value ?? 0)))
        )
      );

      const quotesMap = LST_TYPES.reduce(
        (acc, type, index) => ({
          ...acc,
          [type]: quotes[index],
        }),
        {}
      );

      return quotesMap;
    }
  );
};
