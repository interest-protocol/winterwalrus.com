import useSWR from 'swr';

import { INTEREST_STABLE_DEX_API } from '@/constants/api';

import {
  MetricsAPI,
  MetricsOvertimeAPI,
  PoolsAggregation,
  PoolsMetrics,
} from './pools-stats.types';

export const usePoolsMetrics = () => {
  const { data, ...rest } = useSWR<PoolsMetrics>(
    [usePoolsMetrics.name],
    async () => {
      const url = `${INTEREST_STABLE_DEX_API}/metrics`;

      const data: ReadonlyArray<MetricsAPI> = await fetch(url).then((res) =>
        res.json()
      );

      return {
        ...data.reduce(
          (acc, metrics) => ({
            ...acc,
            [metrics.poolId]: metrics,
          }),
          {} as Record<string, MetricsAPI>
        ),
        tvl: data.reduce((acc, metrics) => acc + parseFloat(metrics.tvl), 0),
        volume: data.reduce(
          (acc, metrics) => acc + parseFloat(metrics.totalVolume),
          0
        ),
      } as PoolsMetrics;
    }
  );

  return {
    metrics: data,
    ...rest,
  };
};

export const usePoolsMetricsOvertime = (
  aggregation: PoolsAggregation = 'daily'
) => {
  const { data, ...rest } = useSWR(
    [usePoolsMetricsOvertime.name, aggregation],
    async () => {
      const url = `${INTEREST_STABLE_DEX_API}/metrics-overtime?interval=1%20month&aggregation=${aggregation}`;

      const data: ReadonlyArray<MetricsOvertimeAPI> = await fetch(url).then(
        (res) => res.json()
      );

      const totalTvl = data.reduce(
        (acc, pool) => acc + parseFloat(pool.tvl),
        0
      );
      const totalFees = data.reduce(
        (acc, pool) => acc + parseFloat(pool.fees),
        0
      );
      const totalVolume = data.reduce(
        (acc, pool) => acc + parseFloat(pool.volume),
        0
      );

      const tvlOvertime = data.map((pool) => ({
        y: parseFloat(pool.tvl),
        x: new Date(pool.period).toLocaleDateString(undefined, {
          weekday: 'short',
          day: '2-digit',
        }),
      }));

      const volumeOvertime = data.map((pool) => ({
        y: parseFloat(pool.volume),
        x: new Date(pool.period).toLocaleDateString(undefined, {
          weekday: 'short',
          day: '2-digit',
        }),
      }));

      const feesOvertime = data.map((pool) => ({
        y: parseFloat(pool.fees),
        x: new Date(pool.period).toLocaleDateString(undefined, {
          weekday: 'short',
          day: '2-digit',
        }),
      }));

      return {
        data,
        totalTvl,
        totalFees,
        tvlOvertime,
        totalVolume,
        feesOvertime,
        volumeOvertime,
      };
    }
  );

  return {
    ...(data ?? {
      data: [],
      totalTvl: 0,
      totalFees: 0,
      totalVolume: 0,
      tvlOvertime: [],
      feesOvertime: [],
      volumeOvertime: [],
    }),
    ...rest,
  };
};
