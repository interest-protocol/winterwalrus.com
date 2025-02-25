import useSWR from 'swr';

import useBlizzardSdk from '../use-blizzard-sdk';

export const useAllowedNodes = (stakingObject: string) => {
  const blizzardSdk = useBlizzardSdk();

  return useSWR([useAllowedNodes.name, stakingObject], () =>
    blizzardSdk.allowedNodes(stakingObject)
  );
};
