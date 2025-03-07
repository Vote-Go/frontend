import { TypeOfVote } from "../../../entities/market/types/common";
import { MarketData } from "../../../entities/market/types/market";
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
