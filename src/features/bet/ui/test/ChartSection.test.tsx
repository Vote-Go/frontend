import React from "react";
import { render } from "@testing-library/react";
import ChartSection from "../ChartSection";
import { LineChart } from "../../../../shared/ui/LineCharts/LineChart";
import { dateAxis } from "../ChartSection";

process.env.TZ = "UTC";

jest.mock("../../../../shared/ui/LineCharts/LineChart", () => ({
  LineChart: jest.fn(() => <div data-testid="mock-line-chart" />),
}));

const mockDate = new Date("2023-10-01T14:30:03Z");
jest.spyOn(global, "Date").mockImplementation(() => mockDate);

const mockMarketData = {
  activityChart: {
    timestamps: ["2023-10-01T14:30:03Z", "2023-10-02T15:45:03Z"],
    volumeYes: [100, 200],
    volumeNo: [50, 150],
  },
};

describe("ChartSection", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders LineChart with correct data and configuration", () => {
    render(<ChartSection marketData={mockMarketData} selectedSpread="1H" />);

    const lineChartProps = LineChart.mock.calls[0][0];

    // Verify data structure
    expect(lineChartProps.data.labels).toEqual(["17:30", "17:30"]);
    expect(lineChartProps.data.datasets).toHaveLength(2);
    expect(lineChartProps.data.datasets[0].label).toBe(
      "Количество голосов YES"
    );
    expect(lineChartProps.data.datasets[1].label).toBe("Количество голосов NO");

    // Verify options
    expect(
      lineChartProps.options.plugins.tooltip.callbacks.label
    ).toBeDefined();
    expect(lineChartProps.options.plugins.legend.display).toBe(false);
  });

  test("formats tooltip values with ₽ symbol", () => {
    render(<ChartSection marketData={mockMarketData} selectedSpread="1D" />);

    const labelCallback =
      LineChart.mock.calls[0][0].options.plugins.tooltip.callbacks.label;

    const mockContext = {
      dataset: { label: "Test Label" },
      raw: 1000,
    };

    expect(labelCallback(mockContext)).toBe("Test Label: 1000₽");
  });

  test("handles empty market data gracefully", () => {
    const emptyMarketData = {
      activityChart: {
        timestamps: [],
        volumeYes: [],
        volumeNo: [],
      },
    };

    render(<ChartSection marketData={emptyMarketData} selectedSpread="1D" />);

    const lineChartProps = LineChart.mock.calls[0][0];
    expect(lineChartProps.data.labels).toEqual([]);
    expect(lineChartProps.data.datasets[0].data).toEqual([]);
  });
});

describe("dateAxis function", () => {
  let mockDate;

  beforeEach(() => {
    mockDate = new Date(2023, 9, 5, 14, 30); // October 5th, 2023 14:30:00
    jest.spyOn(mockDate, "toTimeString").mockReturnValue("14:30:00 GMT+0000");
    jest.spyOn(mockDate, "toLocaleDateString").mockReturnValue("10/5/2023");
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("returns time string for 1H spread", () => {
    expect(dateAxis("1H", mockDate)).toBe("14:30");
    expect(mockDate.toTimeString).toHaveBeenCalled();
  });

  it("returns time string for 6H spread", () => {
    expect(dateAxis("6H", mockDate)).toBe("14:30");
    expect(mockDate.toTimeString).toHaveBeenCalled();
  });

  it("returns time string for 1D spread", () => {
    expect(dateAxis("1D", mockDate)).toBe("14:30");
    expect(mockDate.toTimeString).toHaveBeenCalled();
  });

  it("returns date string for other spreads", () => {
    expect(dateAxis("1W", mockDate)).toBe("10/5/2023");
    expect(mockDate.toLocaleDateString).toHaveBeenCalled();
  });

  it("returns date string for invalid spread", () => {
    expect(dateAxis("invalid", mockDate)).toBe("10/5/2023");
    expect(mockDate.toLocaleDateString).toHaveBeenCalled();
  });

  it("handles lowercase spread values", () => {
    expect(dateAxis("1h", mockDate)).toBe("10/5/2023");
    expect(mockDate.toLocaleDateString).toHaveBeenCalled();
  });

  it("handles undefined spread", () => {
    expect(dateAxis(undefined, mockDate)).toBe("10/5/2023");
    expect(mockDate.toLocaleDateString).toHaveBeenCalled();
  });
});
