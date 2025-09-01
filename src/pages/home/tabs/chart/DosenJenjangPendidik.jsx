import { h } from 'preact';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

// register chart.js modules
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function DosenJenjangPendidik({ male, female }) {
  const data = {
    labels: ['Dosen'],
    datasets: [
        {
        label: 'Laki-laki',
        data: [male],
        backgroundColor: '#60A5FA', // biru soft
        },
        {
        label: 'Perempuan',
        data: [female],
        backgroundColor: '#F9A8D4', // pink soft
        },
    ],
    };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
  };

  return <Bar data={data} options={options} />;
}
