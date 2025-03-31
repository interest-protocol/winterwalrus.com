import { TYPES } from '@interest-protocol/blizzard-sdk';
import { BigNumber } from 'bignumber.js';
import { useRouter } from 'next/router';
import useSWR from 'swr';

import { LST_TYPES_MAP, STAKING_OBJECT } from '@/constants';
import { FixedPointMath } from '@/lib/entities/fixed-point-math';

import useBlizzardSdk from '../use-blizzard-sdk';
import useEpochData from '../use-epoch-data';

const QUOTE_FNS: ReadonlyArray<'toWalAtEpoch' | 'toLstAtEpoch'> = [
  'toLstAtEpoch',
  'toWalAtEpoch',
];

export const useQuotes = () => {
  const { query } = useRouter();
  const blizzardSdk = useBlizzardSdk();
  const { data: epoch } = useEpochData();

  const lst = LST_TYPES_MAP[String(query.lst).toUpperCase()] ?? TYPES.WWAL;

  return useSWR([useQuotes.name, epoch?.currentEpoch, lst], async () => {
    if (!epoch) return { quoteSWal: null, quoteLst: null };

    const [quoteLst, quoteSWal] = await Promise.all(
      QUOTE_FNS.map((quoteFn) =>
        blizzardSdk[quoteFn]({
          epoch: epoch?.currentEpoch,
          blizzardStaking: STAKING_OBJECT[lst],
          value: BigInt(FixedPointMath.toBigNumber(1).toString()),
        }).then((value) => FixedPointMath.toNumber(BigNumber(value ?? 0)))
      )
    );

    return { quoteSWal, quoteLst };
  });
};
