import useSwr from 'swr';

import useBlizzardSdk from '../use-blizzard-sdk';

const useEpochData = () => {
  const blizzardSdk = useBlizzardSdk();

  return useSwr(useEpochData.name, () => blizzardSdk.getEpochData(), {
    refreshInterval: 5000,
  });
};

export default useEpochData;
