export interface HistoricalDataPoint {
	date: Date;
	priceYes: number;
	priceNo: number;
	probabilityYes: number;
	volume: number;
}

export interface ActivityChart {
	timestamps: number[];
	volumes: number[];
	pricesYes: number[];
	pricesNo: number[];
}
