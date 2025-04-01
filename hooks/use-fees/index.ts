import { TYPES } from '@interest-protocol/blizzard-sdk';
import { useRouter } from 'next/router';
import useSWR from 'swr';

import { LST_TYPES_MAP, STAKING_OBJECT } from '@/constants';

import useBlizzardSdk from '../use-blizzard-sdk';

export const useFees = () => {
  const { query } = useRouter();
  const blizzardSdk = useBlizzardSdk();

  const lst = LST_TYPES_MAP[String(query.lst).toUpperCase()] ?? TYPES.WWAL;

  const { data: fees, ...rest } = useSWR(
    [useFees.name, lst, blizzardSdk],
    async () => {
      if (!lst || !blizzardSdk)
        return {
          staking: 0,
          unstaking: 0,
          transmute: 0,
        };

      const fees = await blizzardSdk.getFees(STAKING_OBJECT[lst]);

      return {
        staking: Number(fees.mint) / 100,
        unstaking: Number(fees.burn) / 100,
        transmute: Number(fees.transmute) / 100,
      };
    }
  );

  return {
    ...rest,
    fees,
  };
};
