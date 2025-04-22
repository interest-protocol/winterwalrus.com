import useSWR from 'swr';

import { INTEREST_STABLE_DEX_API } from '@/utils/consts';

const API_BASE = INTEREST_STABLE_DEX_API;

export interface PoolMetric {
  tvl: number;
  apr: number;
  poolId: number;
  volume1D: number;
  volume30D: number;
  totalFees: number;
}

const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to fetch pool metrics');
  return res.json() as Promise<PoolMetric[]>;
};

export const usePoolMetrics = (poolId?: string) => {
  const url = poolId
    ? `${API_BASE}/metrics?poolId=${encodeURIComponent(poolId)}`
    : undefined;

  const { data, error, isLoading } = useSWR<PoolMetric[]>(url, fetcher);

  return { data: data?.[0], error, isLoading };
};
