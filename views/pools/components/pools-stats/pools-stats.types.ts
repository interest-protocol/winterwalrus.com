export type PoolsAggregation = 'daily' | 'weekly' | 'monthly';

export interface MetricsOvertimeAPI {
  volume: string;
  epoch: string;
  tvl: string;
  fees: string;
}

export interface MetricsAPI {
  tvl: string;
  apr: string;
  poolId?: string;
  volume: string;
  volume1D: string;
  volume7D: string;
  volume30D: string;
  fees: string;
  fees1D: string;
  fees7D: string;
  fees30D: string;
  revenue: string;
  revenue1D: string;
  revenue7D: string;
  revenue30D: string;
}

export interface PoolsChartProps {
  agg: PoolsAggregation;
}

export type PoolsMetrics = Record<string, MetricsAPI> & {
  tvl: number;
  volume: number;
};
