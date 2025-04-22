import BigNumber from 'bignumber.js';
import useSWR from 'swr';

import { STAKING_OBJECT } from '@/constants';
import { FixedPointMath } from '@/lib/entities/fixed-point-math';

import useBlizzardSdk from '../use-blizzard-sdk';
import useEpochData from '../use-epoch-data';

const useLstAPR = (lst: string) => {
  const blizzardSdk = useBlizzardSdk();
  const { data: epoch } = useEpochData();

  return useSWR(
    ['apr', useLstAPR.name, lst, blizzardSdk, !!epoch],
    async () => {
      if (!blizzardSdk || !epoch) return { apr: 0 };

      const exchangeRate = await blizzardSdk
        .toLstAtEpoch({
          epoch: epoch.currentEpoch,
          blizzardStaking: STAKING_OBJECT[lst],
          value: BigInt(FixedPointMath.toBigNumber(1).toString()),
        })
        .then((value) => FixedPointMath.toNumber(BigNumber(value ?? 0)));

      return { apr: (1 - exchangeRate) * (365 / 14) };
    }
  );
};

export default useLstAPR;
