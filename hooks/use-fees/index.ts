import { useRouter } from 'next/router';
import useSWR from 'swr';

import { LST_TYPES_MAP, STAKING_OBJECT } from '@/constants';

import useBlizzardSdk from '../use-blizzard-sdk';

export const useFees = () => {
  const { query } = useRouter();
  const blizzardSdk = useBlizzardSdk();

  const lst = LST_TYPES_MAP[String(query.lst).toUpperCase() || 'WWAL'];

  const { data: fees, ...rest } = useSWR([useFees.name, lst], async () => {
    const fees = await blizzardSdk.getFees(STAKING_OBJECT[lst]);

    return {
      staking: +fees.mint / 100,
      unstaking: +fees.burn / 100,
      transmute: +fees.transmute / 100,
    };
  });

  return {
    ...rest,
    fees,
  };
};
