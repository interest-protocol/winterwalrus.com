import useSwr from 'swr';

import { INTEREST_LABS } from '@/constants';

import useBlizzardSdk from '../use-blizzard-sdk';

const useEpochAPR = (nodeId = INTEREST_LABS) => {
  const blizzardSdk = useBlizzardSdk();

  return useSwr(
    ['epoch-apr', nodeId, blizzardSdk],
    () => blizzardSdk?.lastEpochApr({ nodeId }),
    {
      refreshInterval: 5000,
    }
  );
};

export default useEpochAPR;
