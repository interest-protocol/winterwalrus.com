import useSWR from 'swr';

import { INTEREST_STABLE_DEX_API } from '@/constants/api';
import useInterestStableSdk from '@/hooks/use-interest-stable-sdk';
import { MetricsAPI } from '@/views/pools/components/pools-stats/pools-stats.types';

export const usePoolData = (id: string) => {
  const interestStableSdk = useInterestStableSdk();

  return useSWR([usePoolData.name, id, interestStableSdk], async () => {
    if (!interestStableSdk || !id) return;

    const data = await interestStableSdk.getPool(id);

    return data;
  });
};

export const usePoolMetrics = (poolId?: string) =>
  useSWR<MetricsAPI | null>([usePoolMetrics.name, poolId], async () => {
    if (!poolId) return null;

    const url = `${INTEREST_STABLE_DEX_API}/metrics?poolId=${encodeURIComponent(
      poolId
    )}`;

    const data: MetricsAPI = await fetch(url).then((res) => res.json());

    return data;
  });
