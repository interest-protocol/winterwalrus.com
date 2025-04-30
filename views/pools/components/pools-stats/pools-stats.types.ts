export type PoolsAggregation = 'daily' | 'weekly' | 'monthly';

export interface MetricsOvertimeAPI {
  volume: string;
  epoch: string;
  cumulativeTvl: string;
  cumulativeFees: string;
}

export interface MetricsAPI {
  tvl: string;
  apr: string;
  fees: string;
  volume: string;
  poolId: string;
  volume1D: string;
  volume7D: string;
  volume30D: string;
}

export interface PoolsChartProps {
  agg: PoolsAggregation;
}

export type PoolsMetrics = Record<string, MetricsAPI> & {
  tvl: number;
  volume: number;
};
