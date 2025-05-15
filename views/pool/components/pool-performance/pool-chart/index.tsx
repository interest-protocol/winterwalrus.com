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

import { useTabState } from '@/hooks/use-tab-manager';
import { usePoolsMetricsOvertime } from '@/views/pools/components/pools-stats/pools-stats.hooks';

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

export const PoolChart: FC = () => {
  const { innerTabs } = useTabState();
  const tab = innerTabs['pool-performance'] ?? 0;
  const {
    tvlOvertime = [],
    volumeOvertime = [],
    feesOvertime = [],
  } = usePoolsMetricsOvertime();

  const [x, y] = [
    (tab == 0 ? tvlOvertime : tab == 1 ? volumeOvertime : feesOvertime).map(
      (item) => item.x
    ),
    (tab == 0 ? tvlOvertime : tab == 1 ? volumeOvertime : feesOvertime).map(
      (item) => item.y
    ),
  ];

  const data = {
    labels: x,
    datasets: [
      {
        data: y,
        borderColor: '#EE2B5B',
        backgroundColor: 'rgba(153, 239, 228, 0.1)',
        fill: true,
        tension: 0.4,
      },
    ],
  };

  return <Line options={options} data={data} />;
};
