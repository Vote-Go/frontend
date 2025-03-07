import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { SpreadButtons } from "../Event";
import { calculatePayout } from "../../features/bet/lib";
import Event from "../Event";
import { useBet } from "../../features/bet/model/useBet";
import { generateMarketData, formatMarketDate } from "../../shared/lib";
import "@testing-library/jest-dom";
import React from "react";

describe("SpreadButtons Component", () => {
  const mockUpdate = jest.fn();
  const spreadOptions = ["1H", "6H", "1D", "1W", "1M", "ALL"];

  beforeEach(() => {
    mockUpdate.mockClear();
  });

  test("renders all spread options as buttons", () => {
    render(<SpreadButtons updateMarketData={mockUpdate} selectedSpread="1H" />);
    const buttons = screen.getAllByRole("button");

    expect(buttons).toHaveLength(6);
    buttons.forEach((button, index) => {
      expect(button).toHaveTextContent(spreadOptions[index]);
    });
  });

  test("applies default styles to non-selected buttons", () => {
    render(<SpreadButtons updateMarketData={mockUpdate} selectedSpread="6H" />);
    const buttons = screen.getAllByRole("button");

    buttons.forEach((button, index) => {
      if (index === 0) {
        expect(button).toHaveClass("dark:text-black/50");
        expect(button).toHaveClass("text-white");
      } else {
        expect(button).toHaveClass("dark:text-black/50");
        expect(button).toHaveClass("text-white");
      }
    });
  });

  test("includes shared spreadChooseStyle classes on all buttons", () => {
    render(<SpreadButtons updateMarketData={mockUpdate} selectedSpread="1D" />);
    const buttons = screen.getAllByRole("button");

    buttons.forEach((button) => {
      expect(button).toHaveClass("focus:rounded-full");
      expect(button).toHaveClass("hover:cursor-pointer");
      expect(button).toHaveClass("hover:bg-black/5");
    });
  });
});

describe("Betting Interface", () => {
  beforeEach(() => {
    render(<Event />);
  });

  test("renders Yes/No buttons with initial styles", () => {
    // Use regex to match partial text and scope to the betting container
    const bettingContainer = screen.getByTestId("betting-interface");
    const yesButton = screen.getByTestId("yes-button-id");
    const noButton = screen.getByTestId("no-button-id");

    expect(yesButton).toHaveClass("bg-green-500/80");
    expect(noButton).toHaveClass("bg-gray-600/50");
  });
});

describe("Toggle Buttons", () => {
  test("renders with correct initial styles (buyYes = true)", () => {
    render(<Event />);

    const yesButton = screen.getByTestId("yes-button-id");
    const noButton = screen.getByTestId("no-button-id");

    // Yes button (active state)
    expect(yesButton).toHaveClass("bg-green-500/80");
    expect(yesButton).toHaveClass("hover:bg-green-500/90");
    expect(yesButton.querySelector("span")).toHaveClass("text-white/80");

    // No button (inactive state)
    expect(noButton).toHaveClass("bg-gray-600/50");
    expect(noButton.querySelector("span")).toHaveClass("text-gray-300/75");
  });

  test("maintains Yes activation when clicked repeatedly", () => {
    render(<Event />);
    const yesButton = screen.getByTestId("yes-button-id");

    fireEvent.click(yesButton); // No change expected

    // Verify styles remain active
    expect(yesButton).toHaveClass("bg-green-500/80");
    expect(yesButton.querySelector("span")).toHaveClass("text-white/80");
  });

  // Keep existing price text test
  test("displays correct text and prices", () => {
    render(<Event />);
    expect(screen.getByTestId("yes-button-id")).toHaveTextContent("Yes 77$");
    expect(screen.getByTestId("no-button-id")).toHaveTextContent("No23.6$");
  });
});

describe("Addition Buttons", () => {
  test("renders all four addition buttons", () => {
    render(<Event />);
    expect(screen.getByText("+$1")).toBeInTheDocument();
    expect(screen.getByText("+$20")).toBeInTheDocument();
    expect(screen.getByText("+$100")).toBeInTheDocument();
    expect(screen.getByText("Max")).toBeInTheDocument();
  });
});
