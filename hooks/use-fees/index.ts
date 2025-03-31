import { useRouter } from 'next/router';
import useSWR from 'swr';

import { LST_TYPES_MAP, STAKING_OBJECT } from '@/constants';

import useBlizzardSdk from '../use-blizzard-sdk';

export const useFees = () => {
  const { query } = useRouter();
  const blizzardSdk = useBlizzardSdk();

  const lst = LST_TYPES_MAP[String(query.lst).toUpperCase() || 'WWAL'];

  const { data: fees, ...rest } = useSWR([useFees.name, lst], async () => {
    if (!lst)
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
  });

  return {
    ...rest,
    fees,
  };
};
