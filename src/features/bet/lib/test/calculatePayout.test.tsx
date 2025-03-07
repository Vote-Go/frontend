import { calculatePayout } from "../calculatePayout";
import { TypeOfVote } from "../../../../entities/market/types/common";
import { MarketData } from "../../../../entities/market/types/market";

describe("calculatePayout", () => {
  const mockMarketData: MarketData = {
    currentStats: {
      yes: { price: "0.8" },
      no: { price: "0.2" },
    },
  };

  test('calculates payout correctly for "yes" outcome', () => {
    const amount = "100";
    const selectedOutcome: TypeOfVote = "YES";
    const payout = calculatePayout(amount, selectedOutcome, mockMarketData);
    expect(payout).toBe("122.50"); // (100 / 0.8) * 0.98 = 122.50
  });

  test('calculates payout correctly for "no" outcome', () => {
    const amount = "100";
    const selectedOutcome: TypeOfVote = "NO";
    const payout = calculatePayout(amount, selectedOutcome, mockMarketData);
    expect(payout).toBe("490.00"); // (100 / 0.2) * 0.98 = 490.00
  });

  test("calculates payout correctly for numeric amount", () => {
    const amount = 100;
    const selectedOutcome: TypeOfVote = "YES";
    const payout = calculatePayout(amount, selectedOutcome, mockMarketData);
    expect(payout).toBe("122.50"); // (100 / 0.8) * 0.98 = 122.50
  });

  test("calculates payout correctly for small amount", () => {
    const amount = "1";
    const selectedOutcome: TypeOfVote = "YES";
    const payout = calculatePayout(amount, selectedOutcome, mockMarketData);
    expect(payout).toBe("1.23"); // (1 / 0.8) * 0.98 = 1.225 → rounded to 1.23
  });

  test("calculates payout correctly for zero amount", () => {
    const amount = "0";
    const selectedOutcome: TypeOfVote = "YES";
    const payout = calculatePayout(amount, selectedOutcome, mockMarketData);
    expect(payout).toBe("0.00"); // (0 / 0.8) * 0.98 = 0
  });

  test("throws error for invalid outcome", () => {
    const amount = "100";
    const selectedOutcome = "INVALID" as TypeOfVote; // Force an invalid outcome
    expect(() =>
      calculatePayout(amount, selectedOutcome, mockMarketData)
    ).toThrow();
  });
});
