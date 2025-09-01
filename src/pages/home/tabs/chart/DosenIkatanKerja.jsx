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

export default function DosenIkatanKerja({ maleTetap, femaleTetap, maleTidakTetap, femaleTidakTetap }) {
  const data = {
    labels: ['Dosen Tetap', 'Dosen Tidak Tetap'],
    datasets: [
      {
        label: 'Laki-laki',
        data: [maleTetap, maleTidakTetap],
        backgroundColor: '#60A5FA', // biru soft
      },
      {
        label: 'Perempuan',
        data: [femaleTetap, femaleTidakTetap],
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
