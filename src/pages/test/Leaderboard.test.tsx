import {
  render,
  screen,
  fireEvent,
  waitFor,
  within,
} from "@testing-library/react";
import React from "react";
import "@testing-library/jest-dom";
import Leaderboard from "../Leaderboard";

// Mock data from generateTable
const mockData = [
  { name: "Daniil2", rating: 3, score: 522 },
  { name: "Egor", rating: 5, score: 60 },
  { name: "Egor2", rating: 2.5, score: 60 },
  { name: "Daniil", rating: 5, score: 52 },
  { name: "Marat", rating: 4.5, score: 50 },
  { name: "Marat2", rating: 1.5, score: 50 },
  { name: "Nikita", rating: 4.9, score: 35 },
  { name: "Nikita2", rating: 3.9, score: 35 },
  { name: "Alexei", rating: 4.8, score: 25 },
  { name: "Alexei2", rating: 4.6, score: 25 },
];

describe("Leaderboard Component", () => {
  test("renders Hero section with correct content", () => {
    render(<Leaderboard />);
    expect(screen.getByText("Our top predictors")).toBeInTheDocument();
    expect(
      screen.getByText("people who predicted the right outcome the most times")
    ).toBeInTheDocument();
  });

  test("displays table with 10 entries", () => {
    render(<Leaderboard />);
    const rows = screen.getAllByRole("row");
    expect(rows).toHaveLength(11); // 1 header + 10 data rows
  });

  test("initial sort by score descending", async () => {
    render(<Leaderboard />);
    const firstRow = screen.getAllByRole("row")[1];
    expect(firstRow).toHaveTextContent("Daniil2");
    expect(firstRow).toHaveTextContent("522");
  });

  test("displays correct data in all columns", () => {
    render(<Leaderboard />);
    const rows = screen.getAllByRole("row");

    mockData.forEach((item, index) => {
      const cells = within(rows[index + 1]).getAllByRole("cell");
      expect(cells[0]).toHaveTextContent(String(index + 1));
      expect(cells[1]).toHaveTextContent(item.name);
      expect(cells[2]).toHaveTextContent(String(item.rating));
      expect(cells[3]).toHaveTextContent(String(item.score));
    });
  });
});

// Modified mock data with unique scores for stable sorting
const initialSortedData = [
  { name: "Daniil2", score: 522 },
  { name: "Egor", score: 60 },
  { name: "Egor2", score: 62 },
  { name: "Daniil", score: 52 },
  { name: "Marat", score: 50 },
  { name: "Marat2", score: 55 },
  { name: "Nikita", score: 35 },
  { name: "Nikita2", score: 34 },
  { name: "Alexei", score: 25 },
  { name: "Alexei2", score: 24 },
];

// Expected order after ascending sort (by score)
const ascendingOrder = [
  "Alexei2",
  "Alexei",
  "Nikita2",
  "Nikita",
  "Marat2",
  "Marat",
  "Daniil",
  "Egor",
  "Egor2",
  "Daniil2",
];

describe("sortByScore Functionality", () => {
  test("initial render sorts by score descending", () => {
    render(<Leaderboard />);
    const firstRow = screen.getAllByRole("row")[1];
    expect(firstRow).toHaveTextContent(initialSortedData[0].name);
    expect(firstRow).toHaveTextContent(initialSortedData[0].score.toString());
  });
});
