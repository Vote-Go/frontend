import { formatMarketDate } from "../formatDate";

describe("formatMarketDate", () => {
  it("formats valid dates to Russian locale (dd.mm.yyyy)", () => {
    const date = new Date(2023, 0, 1);
    expect(formatMarketDate(date)).toBe("01.01.2023");
  });

  it('returns "Invalid Date" for invalid date objects', () => {
    const invalidDate = new Date("invalid-date-string");
    expect(formatMarketDate(invalidDate)).toBe("Invalid Date");
  });

  it('uses the "ru-RU" locale for formatting', () => {
    const spy = jest.spyOn(Date.prototype, "toLocaleDateString");
    const date = new Date(2023, 0, 1);

    formatMarketDate(date);

    expect(spy).toHaveBeenCalledWith("ru-RU");
    spy.mockRestore();
  });
});
