import { Div } from '@stylin.js/elements';
import {
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js';
import { FC } from 'react';
import { Line } from 'react-chartjs-2';

import { usePoolsMetricsOvertime } from '@/views/pools/pools-metrics.hook';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export const options = {
  responsive: true,
  maintainAspectRatio: false, // Add this line for better responsiveness
  plugins: {
    legend: {
      display: false,
    },
  },
  elements: {
    line: {
      fill: 'origin',
    },
  },
  scales: {
    y: {
      grid: {
        display: false,
      },
      ticks: {
        display: false,
      },
    },
    x: {
      grid: {},
    },
  },
};

export const PoolsChart: FC<{ agg: 'daily' | 'weekly' | 'monthly' }> = ({
  agg,
}) => {
  const { tvlOvertime = [] } = usePoolsMetricsOvertime(agg);

  const data = {
    labels: tvlOvertime.map((item) => item.x),
    datasets: [
      {
        data: tvlOvertime.map((item) => item.y),
        borderColor: '#99EFE4',
        backgroundColor: 'rgba(153, 239, 228, 0.1)',
        fill: true,
        tension: 0.4,
      },
    ],
  };

  return (
    <Div maxHeight="182px" maxWidth={[undefined, undefined, '480px']} flex={1}>
      <Line
        options={options}
        data={data}
        style={{ height: '182px', width: '80%' }}
      />
    </Div>
  );
};
