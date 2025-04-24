export type PoolsAggregation = 'daily' | 'weekly' | 'monthly';

export interface MetricsOvertimeAPI {
  tvl: string;
  fees: string;
  volume: string;
  period: string;
  cumulativeTvl: string;
  cumulativeFees: string;
}

export interface MetricsAPI {
  tvl: string;
  apr: string;
  poolId: string;
  volume1D: string;
  volume30D: string;
  totalFees: string;
  totalVolume: string;
}

export interface PoolsChartProps {
  agg: PoolsAggregation;
}

export type PoolsMetrics = Record<string, MetricsAPI> & {
  tvl: number;
  volume: number;
};
