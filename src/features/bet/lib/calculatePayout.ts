import { TypeOfVote, MarketData } from "../../../entities/market/types";

export const calculatePayout = (
	amount: string | number,
	selectedOutcome: TypeOfVote,
	marketData: MarketData
): string => {
	const lowerOutcome = selectedOutcome.toLowerCase() as Lowercase<TypeOfVote>;
	const price = marketData.currentStats[lowerOutcome].price;

	const base = Number(amount) / Number(price);
	return (base * 0.98).toFixed(2);
};
