import { subDays } from "date-fns";
import {
	HistoricalDataPoint,
	MarketActivityChart,
	MarketData,
} from "../../../entities/market/types/market";

const BASE_DATE = new Date("2025-02-26");
const DAYS_COUNT = 7;
const BASE_PROBABILITY = 50;
const VOLUME_BASE = 25000;

const calculateProbabilities = (index: number) => {
	const probYes = Math.min(85, Math.max(15, BASE_PROBABILITY + index * 5));
	return {
		yes: probYes,
		no: 100 - probYes,
	};
};

const generateHistoricalData = (
	baseDate: Date,
	index: number,
	volumeYes: number,
	volumeNo: number
): HistoricalDataPoint[] => {
	return Array.from({ length: 7 }, (_, j) => ({
		date: subDays(baseDate, j + 1),
		probabilityYes: Math.min(
			95,
			Math.max(5, BASE_PROBABILITY + j * 2 - index * 3)
		),
		volumeYes: volumeYes * (0.5 + j * 0.1),
		volumeNo: volumeNo * (0.5 + j * 0.1),
	}));
};

const createActivityChart = (
	historicalData: HistoricalDataPoint[]
): MarketActivityChart => ({
	timestamps: historicalData.map((d) => d.date.getTime()),
	volumes: historicalData.map((d) => d.volume),
	pricesYes: historicalData.map((d) =>
		Number((d.probabilityYes / 100).toFixed(2))
	),
	pricesNo: historicalData.map((d) =>
		Number(((100 - d.probabilityYes) / 100).toFixed(2))
	),
});

export const generateMarketData = (): MarketData[] => {
	return Array.from({ length: DAYS_COUNT }, (_, i) => {
		const currentDate = subDays(BASE_DATE, i);
		const { yes: probYes, no: probNo } = calculateProbabilities(i);

		const totalVolume = VOLUME_BASE + Math.random() * 15000 * i;
		const yesVolume =
			totalVolume * (probYes / 100) * (0.9 + Math.random() * 0.2);
		const noVolume =
			totalVolume * (probYes / 100) * (0.6 + Math.random() * 0.2);

		const historicalData = generateHistoricalData(
			currentDate,
			i,
			yesVolume,
			noVolume
		);

		return {
			id: `rain-${currentDate.toISOString().split("T")[0]}`,
			title: `Будет ли дождь в Москве ${currentDate.toLocaleDateString(
				"ru-RU"
			)}?`,
			description:
				"Измерение по метеостанции ВДНХ, минимальный порог 5 мм осадков",
			endDate: currentDate.toISOString(),
			totalVolume: Math.round(totalVolume),
			resolutionDetails:
				"Данные Росгидрометцентра, верификация через 48 часов после события",
			currentStats: {
				yes: {
					probability: Math.round(probYes),
					volume: Math.round(yesVolume),
					price: (probYes / 100).toFixed(2),
				},
				no: {
					probability: Math.round(probNo),
					volume: Math.round(totalVolume - yesVolume),
					price: (probNo / 100).toFixed(2),
				},
			},
			historicalData,
			activityChart: createActivityChart(historicalData),
		};
	});
};
