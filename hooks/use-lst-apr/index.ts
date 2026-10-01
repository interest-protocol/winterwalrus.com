import useSWR from 'swr';

import { STAKING_OBJECT } from '@/constants';

import useBlizzardSdk from '../use-blizzard-sdk';

const useLstAPR = (lst: string) => {
  const blizzardSdk = useBlizzardSdk();

  return useSWR([useLstAPR.name, lst, blizzardSdk], async () =>
    lst && STAKING_OBJECT[lst]
      ? { apr: await blizzardSdk.getApr(STAKING_OBJECT[lst]) }
      : null
  );
};

export default useLstAPR;
