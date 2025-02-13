import useSwr from 'swr';

import { MYSTEN_LABS_K8S } from '@/constants';

import useTuskrSdk from '../use-tuskr-sdk';

const useEpochAPR = (nodeId = MYSTEN_LABS_K8S) => {
  const tuskrSdk = useTuskrSdk();

  return useSwr(
    ['epoch-apr', nodeId],
    () => tuskrSdk.lastEpochApr({ nodeId }),
    {
      refreshInterval: 5000,
    }
  );
};

export default useEpochAPR;
