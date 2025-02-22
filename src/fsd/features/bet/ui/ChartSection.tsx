import { MarketData } from "../../../../entities/market/types/market";
import { LineChart } from "../../../../shared/ui/LineCharts/LineChart";

interface IChartSection {
	marketData: MarketData;
	className?: string;
}

const ChartSection: React.FC<IChartSection> = ({ marketData, className }) => {
	return (
		<div
			className={`p-6 bg-white rounded-xl shadow-lg w-full ${className}`}
		>
			<h3 className="text-xl font-semibold mb-4">Динамика цен</h3>
			<LineChart
				data={{
					labels: marketData.activityChart.timestamps.map((t) =>
						new Date(t).toLocaleDateString("ru-RU")
					),
					datasets: [
						{
							label: "Цена ДА",
							data: marketData.activityChart.pricesYes,
							borderColor: "#10B981",
							tension: 0.4,
						},
						{
							label: "Цена НЕТ",
							data: marketData.activityChart.pricesNo,
							borderColor: "#EF4444",
							tension: 0.4,
						},
					],
				}}
				options={{
					plugins: {
						tooltip: {
							callbacks: {
								label: (ctx) =>
									`${ctx.dataset.label}: ${ctx.raw}₽`,
							},
						},
					},
				}}
			/>
		</div>
	);
};

export default ChartSection;
