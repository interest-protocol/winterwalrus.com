import useSWR from 'swr';

import useInterestStableSdk from '@/hooks/use-interest-stable-sdk';

export const usePoolData = (id: string) => {
  const interestStableSdk = useInterestStableSdk();

  return useSWR([usePoolData.name, id, interestStableSdk], async () => {
    if (!interestStableSdk || !id) return;

    const data = await interestStableSdk.getPool(id);

    return data;
  });
};
