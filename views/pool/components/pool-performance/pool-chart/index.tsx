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

const labels = ['Mon 12', 'Tue 13', 'Wed 14', 'Thu 15'];
const DATA = [5, 10, 7, 6];

export const PoolChart: FC = () => {
  const data = {
    labels,
    datasets: [
      {
        data: DATA,
        borderColor: '#99EFE4',
        backgroundColor: 'rgba(153, 239, 228, 0.1)',
        fill: true,
        tension: 0.4,
      },
    ],
  };

  return <Line options={options} data={data} />;
};
