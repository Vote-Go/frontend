export interface MarketData {
  id: string;
  title: string;
  description: string;
  endDate: string;
  totalVolume: number;
  resolutionDetails: string;
  currentStats: MarketOutcomes;
  historicalData: HistoricalDataPoint[];
  activityChart: MarketActivityChart;
}

export interface HistoricalDataPoint {
  date: Date;
  probabilityYes: number;
  volumeYes: number;
  volumeNo: number;
}

export interface MarketActivityChart {
  timestamps: number[];

  pricesYes: number[];
  pricesNo: number[];
  volumeNo: number[];
  volumeYes: number[];
}

interface MarketOutcome {
  probability: number;
  volume: number;
  price: number;
}

interface MarketOutcomes {
  yes: MarketOutcome;
  no: MarketOutcome;
}
