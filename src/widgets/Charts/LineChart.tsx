// components/LineChart.tsx
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend
);

interface LineChartProps {
	data: {
		labels: string[];
		datasets: {
			label: string;
			data: string[];
			borderColor: string;
			tension?: number;
		}[];
	};
	options?: any;
}

export const LineChart = ({ data, options }: LineChartProps) => {
	const defaultOptions = {
		responsive: true,
		maintainAspectRatio: false,
		plugins: {
		  legend: {
			position: 'top' as const,
			labels: {
			  font: { size: 14 }
			}
		  },
		  tooltip: {
			enabled: true,
			backgroundColor: '#fff',
			titleColor: '#1F2937',
			bodyColor: '#1F2937',
			borderColor: '#E5E7EB',
			borderWidth: 1,
			padding: 12,
			boxPadding: 4
		  }
		},
		scales: {
		  y: {
			min: 0,
			max: 1,
			grid: { color: '#F3F4F6' },
			ticks: {
			  callback: (value: number) => `${(value * 100).toFixed(0)}%`,
			  font: { size: 12 }
			}
		  },
		  x: {
			grid: { display: false },
			ticks: { font: { size: 12 } }
		  }
		},
		elements: {
		  line: {
			borderWidth: 3,
			tension: 0.4
		  },
		  point: {
			radius: 5,
			hoverRadius: 8,
			backgroundColor: '#fff',
			borderWidth: 2
		  }
		},
		...options,
	  };

	const processedData = {
		labels: data.labels,
		datasets: data.datasets.map((dataset) => ({
			...dataset,
			data: dataset.data.map(Number),
			borderWidth: 2,
			pointRadius: 3,
			pointHoverRadius: 5,
		})),
	};

	return (
		<div className="p-4 bg-white rounded-xl shadow-sm">
			<Line options={defaultOptions} data={processedData} />
		</div>
	);
};
