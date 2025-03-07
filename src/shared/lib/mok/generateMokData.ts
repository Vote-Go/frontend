import { subDays, subHours, subMinutes, subWeeks } from "date-fns";
import {
  HistoricalDataPoint,
  MarketActivityChart,
  MarketData,
} from "../../../entities/market/types/market";

const BASE_DATE = new Date("2025-03-01");
const DAYS_COUNT = 14;
const BASE_PROBABILITY = 50;
const VOLUME_BASE = 25000;
const MINUTE_DIFFER = 10;
const HOUR_DIFFER = 1;
const DAY_DIFFER = 3;
const WEEK_DIFFER = 1;
const MONTH_DIFFER = 4;
const ALL_DIFFER = 2;

const calculateProbabilities = (index: number) => {
  const probYes = Math.min(65, Math.max(15, BASE_PROBABILITY + index * 5));
  return {
    yes: probYes,
    no: 100 - probYes,
  };
};

// spreadBy: [1 hour | 6 hours | 1 day | 1 week | 1 month| ALL]
// step: [10 minutes | 3 hours | 12 hours | 3 days | 7 days | 2 weeks]
// returns date: "28.02.2025 21:00" | "28.02.2025 18:00" | "28.02.2025 09:00", etc.
export const dateSpread = (baseDate: Date, spreadBy: string, index: number) => {
  switch (spreadBy) {
    case "1H":
      return subMinutes(baseDate, MINUTE_DIFFER * index); // two dates differ by 10- minutes
    case "6H":
      return subHours(baseDate, HOUR_DIFFER * index); // two dates differ by 3 hours
    case "1D":
      return subHours(baseDate, DAY_DIFFER * index); // two dates differ by 12 hours
    case "1W":
      return subDays(baseDate, WEEK_DIFFER * index); // two dates differ by 3 days
    case "1M":
      return subDays(baseDate, MONTH_DIFFER * index); // two dates differ by a week
    default:
      return subWeeks(baseDate, ALL_DIFFER * index);
  }
};

const generateHistoricalData = (
  baseDate: Date,
  index: number,
  volumeYes: number,
  volumeNo: number,
  selectedSpread: string
): HistoricalDataPoint[] => {
  return Array.from({ length: 10 }, (_, j) => ({
    date: dateSpread(baseDate, selectedSpread, j),
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
  timestamps: historicalData.map((d) => d.date.getTime()).reverse(),

  volumeNo: historicalData.map(
    (d) => 100 * Number((d.volumeNo / (d.volumeNo + d.volumeYes)).toFixed(1))
  ),
  volumeYes: historicalData.map(
    (d) => 100 * Number((d.volumeYes / (d.volumeNo + d.volumeYes)).toFixed(1))
  ),
  pricesYes: historicalData.map((d) =>
    Number((d.probabilityYes / 100).toFixed(2))
  ),
  pricesNo: historicalData.map((d) =>
    Number(((100 - d.probabilityYes) / 100).toFixed(2))
  ),
});

export const generateMarketData = (selectedSpread: string): MarketData[] => {
  return Array.from({ length: DAYS_COUNT }, (_, i) => {
    const currentDate = subDays(BASE_DATE, i);
    const { yes: probYes, no: probNo } = calculateProbabilities(i);

    const totalVolume = VOLUME_BASE + Math.random() * 15000 * i;
    const yesVolume =
      totalVolume * (probYes / 100) * (0.4 + Math.random() * 0.2);
    const noVolume =
      totalVolume * (probYes / 100) * (0.6 + Math.random() * 0.2);

    const historicalData = generateHistoricalData(
      currentDate,
      i,
      yesVolume,
      noVolume,
      selectedSpread
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
