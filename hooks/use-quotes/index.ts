import { SHARED_OBJECTS } from '@interest-protocol/blizzard-sdk';
import { BigNumber } from 'bignumber.js';
import useSWR from 'swr';

import { FixedPointMath } from '@/lib/entities/fixed-point-math';

import useBlizzardSdk from '../use-blizzard-sdk';
import useEpochData from '../use-epoch-data';

const QUOTE_FNS: ReadonlyArray<'toWalAtEpoch' | 'toLstAtEpoch'> = [
  'toLstAtEpoch',
  'toWalAtEpoch',
];

export const useQuotes = () => {
  const blizzardSdk = useBlizzardSdk();
  const { data: epoch } = useEpochData();

  return useSWR([useQuotes.name, epoch?.currentEpoch], async () => {
    if (!epoch) return { quoteSWal: null, quoteLst: null };

    const [quoteLst, quoteSWal] = await Promise.all(
      QUOTE_FNS.map((quoteFn) =>
        blizzardSdk[quoteFn]({
          epoch: epoch?.currentEpoch,
          value: BigInt(FixedPointMath.toBigNumber(1).toString()),
          blizzardStaking: SHARED_OBJECTS.WWAL_STAKING({
            mutable: true,
          }).objectId,
        }).then((value) => FixedPointMath.toNumber(BigNumber(value ?? 0)))
      )
    );

    return { quoteSWal, quoteLst };
  });
};
