import './pools-chart.init';

import { Div } from '@stylin.js/elements';
import { FC } from 'react';
import { Line } from 'react-chartjs-2';

import { usePoolsMetricsOvertime } from '@/views/pools/components/pools-stats/pools-stats.hooks';

import { PoolsChartProps } from '../pools-stats.types';
import { poolsChartOptions } from './pools-chart.data';
import { getChartsData } from './pools-chart.utils';

export const PoolsChart: FC<PoolsChartProps> = ({ agg }) => {
  const { tvlOvertime = [] } = usePoolsMetricsOvertime(agg);

  return (
    <Div maxHeight="12rem" width="100%">
      <Line
        options={poolsChartOptions}
        data={getChartsData(tvlOvertime)}
        style={{ height: '12rem', width: '100%' }}
      />
    </Div>
  );
};
