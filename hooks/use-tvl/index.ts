import BigNumber from 'bignumber.js';
import useSWR from 'swr';

import { STAKING_OBJECT } from '@/constants';
import { FixedPointMath } from '@/lib/entities/fixed-point-math';

import useBlizzardSdk from '../use-blizzard-sdk';

const useTvl = () => {
  const blizzardSdk = useBlizzardSdk();

  return useSWR([useTvl.name, blizzardSdk], async () => {
    const tvl = await blizzardSdk.getTvl();

    const byLst = Object.entries(STAKING_OBJECT).reduce(
      (acc, [lst, staking]) => ({
        ...acc,
        [lst]: FixedPointMath.toNumber(BigNumber(String(tvl[staking] ?? 0))),
      }),
      {} as Record<string, number>
    );

    return {
      byLst,
      total: Object.values(byLst).reduce((acc, value) => acc + value, 0),
    };
  });
};

export default useTvl;
