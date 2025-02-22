import { Container } from "../shared/Container";
import Hero from "../widgets/Hero/Hero";
import { useState, useMemo } from "react";
import { LineChart } from "../widgets/Charts/LineChart";
import { Input } from "../shared/ui/Input";
import { Button } from "../shared/ui/Button";
import { cn } from "../helpers/cn/cn";
interface HistoricalDataPoint {
	date: Date;
	probabilityYes: number;
	volume: number;
}

interface ActivityChart {
	timestamps: number[];
	volumes: number[];
	pricesYes: string[];
	pricesNo: string[];
}

interface OutcomeStats {
	probability: number;
	volume: number;
	price: string;
}

interface CurrentStats {
	yes: OutcomeStats;
	no: OutcomeStats;
}

interface MarketData {
	id: string;
	title: string;
	description: string;
	endDate: string;
	totalVolume: number;
	resolutionDetails: string;
	currentStats: CurrentStats;
	historicalData: HistoricalDataPoint[];
	activityChart: ActivityChart;
}

// Явное указание типа для функции
const generateMarketData: () => MarketData[] = () => {
	const baseDate = new Date("2025-02-26");
	const days = 7;

	return Array.from({ length: days }, (_, i) => {
		const date = new Date(baseDate);
		date.setDate(baseDate.getDate() - i);

		// Оптимизированные вычисления вероятностей
		const baseProbYes = Math.min(85, Math.max(15, 50 + i * 5));
		const baseProbNo = 100 - baseProbYes;

		// Типизированные вычисления объемов
		const totalVolume: number = 25000 + Math.random() * 15000 * i;
		const yesVolume: number =
			totalVolume * (baseProbYes / 100) * (0.9 + Math.random() * 0.2);
		const noVolume: number = totalVolume - yesVolume;

		// Генерация исторических данных с правильными типами
		const historicalData: HistoricalDataPoint[] = Array.from(
			{ length: 7 },
			(_, j) => ({
				date: new Date(date.setDate(date.getDate() - 1)),
				probabilityYes: Math.min(
					95,
					Math.max(5, baseProbYes + j * 2 - i * 3)
				),
				volume: totalVolume * (0.5 + j * 0.1),
			})
		);

		return {
			id: `rain-2025-02-${26 - i}`,
			title: `Будет ли дождь в Москве ${date.toLocaleDateString(
				"ru-RU"
			)}?`,
			description:
				"Измерение по метеостанции ВДНХ, минимальный порог 5 мм осадков",
			endDate: date.toISOString(),
			totalVolume: Math.round(totalVolume),
			resolutionDetails:
				"Данные Росгидрометцентра, верификация через 48 часов после события",
			currentStats: {
				yes: {
					probability: Math.round(baseProbYes),
					volume: Math.round(yesVolume),
					price: (baseProbYes / 100).toFixed(2),
				},
				no: {
					probability: Math.round(baseProbNo),
					volume: Math.round(noVolume),
					price: (baseProbNo / 100).toFixed(2),
				},
			},
			historicalData,
			activityChart: {
				timestamps: historicalData.map((d) => d.date.getTime()),
				volumes: historicalData.map((d) => d.volume),
				pricesYes: historicalData.map((d) =>
					(d.probabilityYes / 100).toFixed(2)
				),
				pricesNo: historicalData.map((d) =>
					((100 - d.probabilityYes) / 100).toFixed(2)
				),
			},
		};
	});
};

const Event = () => {
	const [marketData] = useState(generateMarketData()[0]);
	const [selectedOutcome, setSelectedOutcome] = useState<"YES" | "NO">("YES");
	const [amount, setAmount] = useState("");

	const potentialPayout = useMemo(() => {
		// as keyof CurrentStats
		const base =
			Number(amount) /
			Number(
				marketData.currentStats[selectedOutcome.toLowerCase()].price
			);
		return (base * 0.98).toFixed(2); // комиссия 2%
	}, [amount, selectedOutcome, marketData]);

	return (
		<Container className="max-w-6xl mx-auto space-y-6">
			<Hero
				title={marketData.title}
				subtitle={`Закрытие: ${new Date(
					marketData.endDate
				).toLocaleDateString("ru-RU")}`}
			/>

			<div className="grid gap-4 md:grid-cols-2">
				<OutcomeButton
					outcome="YES"
					selected={selectedOutcome === "YES"}
					price={marketData.currentStats.yes.price}
					probability={marketData.currentStats.yes.probability}
					onClick={() => setSelectedOutcome("YES")}
				/>
				<OutcomeButton
					outcome="NO"
					selected={selectedOutcome === "NO"}
					price={marketData.currentStats.no.price}
					probability={marketData.currentStats.no.probability}
					onClick={() => setSelectedOutcome("NO")}
				/>
			</div>

			<ChartSection marketData={marketData} />

			<BetSection
				selectedOutcome={selectedOutcome}
				amount={amount}
				onAmountChange={setAmount}
				potentialPayout={potentialPayout}
			/>

			<EventDetails
				description={marketData.description}
				resolutionDetails={marketData.resolutionDetails}
			/>

			<HistoryTable historicalData={marketData.historicalData} />
		</Container>
	);
};
export default Event;
// Вынесенные компоненты
const OutcomeButton = ({ outcome, selected, price, probability, onClick }) => (
	<div
		onClick={onClick}
		className={cn(
			"p-4 rounded-xl transition-all cursor-pointer border-2",
			selected
				? outcome === "YES"
					? "border-green-500 bg-green-50 shadow-lg"
					: "border-red-500 bg-red-50 shadow-lg"
				: "border-transparent bg-gray-50 hover:bg-gray-100"
		)}
	>
		<div className="flex items-center justify-between">
			<h3
				className={cn(
					"text-xl font-bold",
					outcome === "YES" ? "text-green-600" : "text-red-600"
				)}
			>
				{outcome}
			</h3>
			<div className="text-right">
				<p className="text-3xl font-bold">{price}₽</p>
				<p className="text-sm text-gray-500">
					{probability}% вероятность
				</p>
			</div>
		</div>
	</div>
);

const ChartSection = ({ marketData }) => (
	<div className="p-6 bg-white rounded-xl shadow-lg">
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
							label: (ctx) => `${ctx.dataset.label}: ${ctx.raw}₽`,
						},
					},
				},
			}}
		/>
	</div>
);

const BetSection = ({
	selectedOutcome,
	amount,
	onAmountChange,
	potentialPayout,
}) => (
	<div className="p-6 bg-white rounded-xl shadow-lg space-y-4">
		<div className="flex gap-3">
			<Input
				type="number"
				value={amount}
				onChange={(e) => onAmountChange(e.target.value)}
				placeholder="Сумма ставки"
				className="flex-1 text-lg py-3"
				min="0"
			/>
			<Button
				variant={selectedOutcome === "YES" ? "primary" : "danger"}
				className="text-lg px-8 py-3"
			>
				Купить {selectedOutcome}
			</Button>
		</div>
		{amount && (
			<div className="text-sm text-gray-600 font-medium">
				Потенциальный выигрыш: {potentialPayout}₽ (после комиссии)
			</div>
		)}
	</div>
);

const EventDetails = ({ description, resolutionDetails }) => (
	<div className="p-6 bg-white rounded-xl shadow-lg space-y-4">
		<h3 className="text-xl font-semibold">Детали события</h3>
		<p className="text-gray-600 leading-relaxed">{description}</p>
		<div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
			<h4 className="font-semibold text-amber-800 mb-2">
				Правила разрешения
			</h4>
			<p className="text-sm text-amber-700">{resolutionDetails}</p>
		</div>
	</div>
);

const HistoryTable = ({ historicalData }) => (
	<div className="p-6 bg-white rounded-xl shadow-lg">
		<h3 className="text-xl font-semibold mb-4">История торгов</h3>
		<div className="overflow-x-auto">
			<table className="w-full">
				<thead className="bg-gray-50">
					<tr>
						<th className="text-left py-3 px-4">Дата</th>
						<th className="text-center py-3 px-4 text-green-600">
							ДА
						</th>
						<th className="text-center py-3 px-4 text-red-600">
							НЕТ
						</th>
					</tr>
				</thead>
				<tbody>
					{historicalData.map((point, i) => (
						<tr key={i} className={i % 2 === 0 ? "bg-gray-50" : ""}>
							<td className="py-3 px-4">
								{new Date(point.date).toLocaleDateString(
									"ru-RU"
								)}
							</td>
							<td className="text-center py-3 px-4 font-medium">
								{(point.probabilityYes / 100).toFixed(2)}₽
							</td>
							<td className="text-center py-3 px-4 font-medium">
								{((100 - point.probabilityYes) / 100).toFixed(
									2
								)}
								₽
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	</div>
);
