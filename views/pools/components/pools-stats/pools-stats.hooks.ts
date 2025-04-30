import useSWR from 'swr';

import { INTEREST_STABLE_DEX_API } from '@/constants/api';

import {
  MetricsAPI,
  MetricsOvertimeAPI,
  PoolsAggregation,
} from './pools-stats.types';

export const usePoolsMetrics = () => {
  const { data, ...rest } = useSWR<MetricsAPI>(
    [usePoolsMetrics.name],
    async () => {
      const url = `${INTEREST_STABLE_DEX_API}/metrics`;

      const data: MetricsAPI = await fetch(url).then((res) => res.json());
      return data;
    }
  );

  return {
    metrics: data,
    ...rest,
  };
};

export const usePoolsMetricsOvertime = (
  aggregation: PoolsAggregation = 'daily',
  poolId?: string
) => {
  const { data, ...rest } = useSWR(
    [usePoolsMetricsOvertime.name, aggregation, 'daily', poolId],
    async () => {
      const url = `${INTEREST_STABLE_DEX_API}/metrics-overtime?interval=1%20month&aggregation=${aggregation}`;

      const data: ReadonlyArray<MetricsOvertimeAPI> = await fetch(url).then(
        (res) => res.json()
      );

      const latestTvl = Number(data.toReversed()[0].tvl ?? 0);
      const latestFees = Number(data.toReversed()[0].fees ?? 0);
      const latestVolume = Number(data.toReversed()[0].volume ?? 0);

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
        latestTvl,
        latestFees,
        tvlOvertime,
        latestVolume,
        feesOvertime,
        volumeOvertime,
      };
    }
  );

  return {
    ...(data ?? {
      data: [],
      latestTvl: 0,
      latestFees: 0,
      latestVolume: 0,
      tvlOvertime: [],
      feesOvertime: [],
      volumeOvertime: [],
    }),
    ...rest,
  };
};
