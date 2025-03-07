import { render } from "@testing-library/react";
import { Line } from "react-chartjs-2";
import { LineChart } from "../LineChart";
import React from "react";
import "@testing-library/jest-dom";

jest.mock("react-chartjs-2", () => ({
  Line: jest.fn(() => null),
}));

const sampleData = {
  labels: ["Jan", "Feb", "Mar"],
  datasets: [
    {
      label: "Dataset 1",
      data: ["50", 75, "85"],
      borderColor: "#FF0000",
    },
  ],
};

const customOptions = {
  plugins: {
    legend: { position: "bottom" },
  },
  scales: {
    y: { min: 20 },
  },
};

describe("LineChart Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders styled container correctly", () => {
    const { container } = render(<LineChart data={sampleData} />);

    const chartContainer = container.querySelector("div");

    // Replace the style check with a class check
    expect(chartContainer).toHaveClass("h-[50vh]");
  });
});

jest.mock("react-chartjs-2", () => ({
  Line: jest.fn(() => null),
}));

const sampleData2 = {
  labels: ["Jan", "Feb", "Mar"],
  datasets: [{ label: "Test", data: [10, 20, 30] }],
};

describe("LineChart scales configuration", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("applies default y-axis configuration", () => {
    render(<LineChart data={sampleData2} />);

    const lineCall = Line.mock.calls[0][0];

    expect(lineCall.options.scales.y).toEqual(
      expect.objectContaining({
        min: 0,
        max: 100,
        grid: { display: false },
        ticks: expect.objectContaining({
          callback: expect.any(Function),
          font: { size: 12 },
        }),
      })
    );
  });

  test("applies default x-axis configuration", () => {
    render(<LineChart data={sampleData2} />);

    const lineCall = Line.mock.calls[0][0];

    expect(lineCall.options.scales.x).toEqual(
      expect.objectContaining({
        grid: { display: false },
        ticks: expect.objectContaining({
          font: { size: 12 },
        }),
      })
    );
  });

  test("formats y-axis ticks as percentages", () => {
    render(<LineChart data={sampleData2} />);

    const lineCall = Line.mock.calls[0][0];
    const callback = lineCall.options.scales.y.ticks.callback;

    expect(callback(50)).toBe("50%");
    expect(callback(75.9)).toBe("76%");
    expect(callback(0)).toBe("0%");
  });
});
