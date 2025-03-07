import { generateMarketData, dateSpread } from "../generateMokData";
import { subDays, subHours, subMinutes, subWeeks } from "date-fns";

describe("generateMarketData", () => {
  const BASE_DATE = new Date("2025-03-01T00:00:00Z");

  test("generates correct number of market entries", () => {
    const marketData = generateMarketData("1H");
    expect(marketData).toHaveLength(14);
  });

  test("creates valid market data structure", () => {
    const [marketEntry] = generateMarketData("1D");

    expect(marketEntry).toHaveProperty("id");
    expect(marketEntry).toHaveProperty("title");
    expect(marketEntry).toHaveProperty("description");
    expect(marketEntry).toHaveProperty("endDate");
    expect(marketEntry).toHaveProperty("totalVolume");
    expect(marketEntry).toHaveProperty("resolutionDetails");
    expect(marketEntry).toHaveProperty("currentStats");
    expect(marketEntry).toHaveProperty("historicalData");
    expect(marketEntry).toHaveProperty("activityChart");
  });

  test("calculates probabilities within valid range", () => {
    const marketData = generateMarketData("1H");

    marketData.forEach((entry) => {
      const { yes, no } = entry.currentStats;
      expect(yes.probability).toBeGreaterThanOrEqual(15);
      expect(yes.probability).toBeLessThanOrEqual(65);
      expect(no.probability).toBe(100 - yes.probability);
    });
  });

  test("generates consistent historical data", () => {
    const marketData = generateMarketData("1D")[0];
    const { historicalData } = marketData;

    expect(historicalData).toHaveLength(10);
    historicalData.forEach((point, index) => {
      expect(point).toHaveProperty("date");
      expect(point).toHaveProperty("probabilityYes");
      expect(point).toHaveProperty("volumeYes");
      expect(point).toHaveProperty("volumeNo");
    });
  });
});

describe("dateSpread", () => {
  const baseDate = new Date("2023-10-01T12:00:00Z");

  test("applies 10-minute increments for 1H spread", () => {
    const result = dateSpread(baseDate, "1H", 2);
    const expected = subMinutes(baseDate, 10 * 2); 
    expect(result.getTime()).toBe(expected.getTime());
  });

  test("applies 3-hour increments for 6H spread", () => {
    const result = dateSpread(baseDate, "6H", 3);
    const expected = subHours(baseDate, 1 * 3);
    expect(result.getTime()).toBe(expected.getTime());
  });

  test("applies 12-hour increments for 1D spread", () => {
    const result = dateSpread(baseDate, "1D", 2);
    const expected = subHours(baseDate, 3 * 2);
    expect(result.getTime()).toBe(expected.getTime());
  });

  test("applies 3-day increments for 1W spread", () => {
    const result = dateSpread(baseDate, "1W", 4);
    const expected = subDays(baseDate, 1 * 4);
    expect(result.getTime()).toBe(expected.getTime());
  });

  test("applies 7-day increments for 1M spread", () => {
    const result = dateSpread(baseDate, "1M", 3);
    const expected = subDays(baseDate, 4 * 3);
    expect(result.getTime()).toBe(expected.getTime());
  });

  test("applies 14-week increments for default/ALL spread", () => {
    const result = dateSpread(baseDate, "ALL", 2);
    const expected = subWeeks(baseDate, 2 * 2); 
    expect(result.getTime()).toBe(expected.getTime());
  });
});
