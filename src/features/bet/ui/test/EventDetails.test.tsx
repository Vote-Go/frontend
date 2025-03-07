import React from "react";
import { render, screen } from "@testing-library/react";
import EventDetails from "../EventDetails";
import "@testing-library/jest-dom";

const defaultProps = {
  description: "Sample event description",
  resolutionDetails: "Sample resolution rules",
};

describe("EventDetails", () => {
  test("renders all content correctly", () => {
    render(<EventDetails {...defaultProps} />);

    expect(screen.getByText("Детали события")).toBeInTheDocument();
    expect(screen.getByText(defaultProps.description)).toBeInTheDocument();

    expect(screen.getByText("Правила разрешения")).toBeInTheDocument();
    expect(
      screen.getByText(defaultProps.resolutionDetails)
    ).toBeInTheDocument();
  });

  test("applies correct styling classes", () => {
    render(<EventDetails {...defaultProps} />);

    const mainContainer = screen.getByText("Детали события").closest("div");
    expect(mainContainer).toHaveClass(
      "p-6",
      "bg-white/7",
      "dark:bg-white",
      "rounded-xl",
      "shadow-lg",
      "space-y-4"
    );

    const resolutionBox = screen.getByText("Правила разрешения").closest("div");
    expect(resolutionBox).toHaveClass(
      "dark:bg-amber-50",
      "bg-amber-50/75",
      "p-4",
      "rounded-lg",
      "border",
      "border-amber-200"
    );

    expect(screen.getByText(defaultProps.description)).toHaveClass(
      "dark:text-gray-600",
      "text-gray-400"
    );
    expect(screen.getByText(defaultProps.resolutionDetails)).toHaveClass(
      "text-sm",
      "text-amber-800",
      "dark:text-amber-700"
    );
  });

  test("handles empty content gracefully", () => {
    render(<EventDetails description="" resolutionDetails="" />);

    expect(
      screen.queryByText(defaultProps.description)
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText(defaultProps.resolutionDetails)
    ).not.toBeInTheDocument();

    expect(screen.getByText("Детали события")).toBeInTheDocument();
    expect(screen.getByText("Правила разрешения")).toBeInTheDocument();

    const descriptionParagraph = screen
      .getByText("Детали события")
      .parentElement.querySelector("p");
    expect(descriptionParagraph).toBeInTheDocument();
    expect(descriptionParagraph).toHaveTextContent("");
  });
});
