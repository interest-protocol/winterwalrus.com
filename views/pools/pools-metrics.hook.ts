import useSWR from 'swr';

import { INTEREST_STABLE_DEX_API } from '@/utils/consts';

const API_BASE = INTEREST_STABLE_DEX_API;

export interface PoolMetric {
  period: string;
  tvl: string;
  cumulativeTvl: string;
  volume: string;
  fees: string;
  cumulativeFees: string;
}

const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to fetch pool metrics');
  return res.json() as Promise<PoolMetric[]>;
};

export const usePoolsMetricsOvertime = (
  aggregation: 'daily' | 'weekly' | 'monthly' = 'daily'
) => {
  const url = `${API_BASE}/metrics-overtime?interval=1%20month&aggregation=${aggregation}`;

  const { data, error, isLoading } = useSWR<PoolMetric[]>(url, fetcher);

  const totalTvl =
    data?.reduce((acc, pool) => acc + parseFloat(pool.tvl), 0) || 0;
  const totalVolume =
    data?.reduce((acc, pool) => acc + parseFloat(pool.volume), 0) || 0;
  const totalFees =
    data?.reduce((acc, pool) => acc + parseFloat(pool.fees), 0) || 0;

  const tvlOvertime = data
    ? data.map((pool) => ({
        y: parseFloat(pool.tvl),
        x: new Date(pool.period).toLocaleDateString(undefined, {
          weekday: 'short',
          day: '2-digit',
        }),
      }))
    : [];

  const volumeOvertime = data
    ? data.map((pool) => ({
        y: parseFloat(pool.volume),
        x: new Date(pool.period).toLocaleDateString(undefined, {
          weekday: 'short',
          day: '2-digit',
        }),
      }))
    : [];

  const feesOvertime = data
    ? data.map((pool) => ({
        y: parseFloat(pool.fees),
        x: new Date(pool.period).toLocaleDateString(undefined, {
          weekday: 'short',
          day: '2-digit',
        }),
      }))
    : [];

  return {
    data,
    error,
    isLoading,
    totalTvl,
    totalVolume,
    tvlOvertime,
    volumeOvertime,
    feesOvertime,
    totalFees,
  };
};
