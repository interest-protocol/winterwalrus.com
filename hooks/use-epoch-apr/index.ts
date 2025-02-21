import useSwr from 'swr';

import { MYSTEN_LABS_K8S } from '@/constants';

import useBlizzardSdk from '../use-blizzard-sdk';

const useEpochAPR = (nodeId = MYSTEN_LABS_K8S) => {
  const blizzardSdk = useBlizzardSdk();

  return useSwr(
    ['epoch-apr', nodeId],
    () => blizzardSdk.lastEpochApr({ nodeId }),
    {
      refreshInterval: 5000,
    }
  );
};

export default useEpochAPR;
