import useSwr from 'swr';

import useTuskrSdk from '../use-tuskr-sdk';

const useEpochData = () => {
  const tuskrSdk = useTuskrSdk();

  return useSwr('epoch-data', tuskrSdk.getEpochData, {
    refreshInterval: 5000,
  });
};

export default useEpochData;
