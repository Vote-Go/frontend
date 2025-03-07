import { render, screen, fireEvent } from "@testing-library/react";
import { Leaderboard } from "../../../pages";
import { BiSortAlt2 } from "react-icons/bi";
import "@testing-library/jest-dom";
import React from "react";
import { Container } from "../../../shared/ui/Container";
import { Hero } from "../../../widgets/hero";

describe("Leaderboard", () => {
  const renderLeaderboard = () => render(<Leaderboard />);

  test("renders the table with headers", () => {
    renderLeaderboard();

    // Check if the table headers are rendered
    expect(screen.getByText("№")).toBeInTheDocument();
    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("Rating")).toBeInTheDocument();
    expect(screen.getByText("Score")).toBeInTheDocument();
  });

  test("renders the table rows with initial data", () => {
    renderLeaderboard();

    // Check if the initial rows are rendered
    expect(screen.getByText("Marat")).toBeInTheDocument();
    expect(screen.getByText("Alexei")).toBeInTheDocument();
    expect(screen.getByText("Egor")).toBeInTheDocument();
  });

  test("sorts the table by score in descending order initially", () => {
    renderLeaderboard();

    // Check if the first row has the highest score
    const firstRowScore = screen
      .getAllByRole("row")[1]
      .querySelector("td:nth-child(4)");
    expect(firstRowScore).toHaveTextContent("522");
  });

  test("sorts the table by score in ascending order when the score sort icon is clicked", () => {
    renderLeaderboard();

    // Click the score sort icon
    const scoreSortIcon = screen
      .getByText("Score")
      .closest("th")
      ?.querySelector("svg");
    fireEvent.click(scoreSortIcon!);

    // Check if the first row has the lowest score
    const firstRowScore = screen
      .getAllByRole("row")[1]
      .querySelector("td:nth-child(4)");
    expect(firstRowScore).toHaveTextContent("25");
  });

  test("sorts the table by rating in descending order when the rating sort icon is clicked", () => {
    renderLeaderboard();

    // Click the rating sort icon
    const ratingSortIcon = screen
      .getByText("Rating")
      .closest("th")
      ?.querySelector("svg");
    fireEvent.click(ratingSortIcon!);

    // Check if the first row has the highest rating
    const firstRowRating = screen
      .getAllByRole("row")[1]
      .querySelector("td:nth-child(3)");
    expect(firstRowRating).toHaveTextContent("1.5");
  });

  test("sorts the table by rating in ascending order when the rating sort icon is clicked twice", () => {
    renderLeaderboard();

    // Click the rating sort icon twice
    const ratingSortIcon = screen
      .getByText("Rating")
      .closest("th")
      ?.querySelector("svg");
    fireEvent.click(ratingSortIcon!); // First click: sort by descending
    fireEvent.click(ratingSortIcon!); // Second click: sort by ascending

    // Check if the first row has the lowest rating
    const firstRowRating = screen
      .getAllByRole("row")[1]
      .querySelector("td:nth-child(3)");
    expect(firstRowRating).toHaveTextContent("5");
  });
});
