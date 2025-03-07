import React from "react";
import { render, screen } from "@testing-library/react";
import HistoryVotesTable from "../HistoryVotesTable";
import { formatPrice } from "../../../../shared/lib";
import "@testing-library/jest-dom";

jest.mock("../../../../shared/lib", () => ({
  formatPrice: jest.fn((value) => `${value}₽`),
}));

const mockHistoricalData = [
  {
    date: "2023-10-01T00:00:00Z",
    volumeYes: 1000,
    volumeNo: 500,
  },
  {
    date: "2023-10-02T00:00:00Z",
    volumeYes: 1500,
    volumeNo: 750,
  },
];

describe("HistoryVotesTable", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders table headers correctly", () => {
    render(<HistoryVotesTable historicalData={mockHistoricalData} />);
    const headers = screen.getAllByRole("columnheader");
    expect(headers).toHaveLength(3);
    expect(headers[0]).toHaveTextContent("Дата");
    expect(headers[1]).toHaveTextContent("Yes");
    expect(headers[2]).toHaveTextContent("No");
  });

  test("renders historical data rows with formatted values", () => {
    render(<HistoryVotesTable historicalData={mockHistoricalData} />);

    expect(screen.getByText("01.10.2023")).toBeInTheDocument();
    expect(screen.getByText("02.10.2023")).toBeInTheDocument();

    expect(screen.getByText("1000₽")).toBeInTheDocument();
    expect(screen.getByText("500₽")).toBeInTheDocument();
    expect(screen.getByText("1500₽")).toBeInTheDocument();
    expect(screen.getByText("750₽")).toBeInTheDocument();
  });

  test("handles empty historical data gracefully", () => {
    render(<HistoryVotesTable historicalData={[]} />);
    const rows = screen.getAllByRole("row");
    expect(rows).toHaveLength(1); // Only header row remains
    expect(screen.queryByText("01.10.2023")).not.toBeInTheDocument();
  });

  test("applies correct styling classes", () => {
    render(<HistoryVotesTable historicalData={mockHistoricalData} />);

    const container = screen.getByText("История торгов").closest("div");
    expect(container).toHaveClass(
      "p-6",
      "bg-white/5",
      "dark:bg-white",
      "rounded-xl",
      "shadow-lg"
    );

    const headers = screen.getAllByRole("columnheader");
    headers.forEach((header) => {
      expect(header).toHaveClass(
        "dark:text-gray-400",
        "text-gray-400/50",
        "h-10",
        "px-2"
      );
    });

    const dataRow = screen.getAllByRole("row")[1];
    expect(dataRow).toHaveClass(
      "border-b",
      "dark:text-black",
      "text-white/75",
      "border-gray-800/50",
      "dark:border-gray-300",
      "hover:bg-gray-900/40",
      "dark:hover:bg-gray-100"
    );
  });
});
