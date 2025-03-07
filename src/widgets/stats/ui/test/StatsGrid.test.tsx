import { render, screen } from "@testing-library/react";
import { StatsGrid } from "../StatsGrid";
import { StatsItem } from "../StatsItem";
import React from "react";
import "@testing-library/jest-dom";

jest.mock("../StatsItem", () => ({
  StatsItem: ({ value, label }) => (
    <div data-testid="stat-item">
      <span data-testid="value">{value}</span>
      <span data-testid="label">{label}</span>
    </div>
  ),
}));

const sampleItems = [
  { value: 150, label: "Active Users" },
  { value: 85, label: "Daily Visits" },
  { value: 3200, label: "Total Downloads" },
];

describe("StatsGrid Component", () => {
  test("renders flex container with proper classes", () => {
    render(<StatsGrid items={sampleItems} />);
    const flexContainer = screen.getByTestId("flex-container");
    expect(flexContainer).toHaveClass(
      "flex",
      "flex-wrap",
      "-m-4",
      "text-center"
    );
  });

  test("renders all stat items", () => {
    render(<StatsGrid items={sampleItems} />);
    const statItems = screen.getAllByTestId("stat-item");
    expect(statItems).toHaveLength(sampleItems.length);
  });

  test("passes correct props to StatItem components", () => {
    render(<StatsGrid items={sampleItems} />);

    sampleItems.forEach((item) => {
      const value = screen.getByText(item.value.toString());
      const label = screen.getByText(item.label);
      expect(value).toBeInTheDocument();
      expect(label).toBeInTheDocument();
    });
  });

  test("maintains proper structure with multiple items", () => {
    render(<StatsGrid items={sampleItems} />);
    const container = screen.getByTestId("container-section");
    const flexContainer = screen.getByTestId("flex-container");

    expect(container).toContainElement(flexContainer);
    sampleItems.forEach((item) => {
      expect(flexContainer).toContainHTML(item.value.toString());
      expect(flexContainer).toContainHTML(item.label);
    });
  });
});
