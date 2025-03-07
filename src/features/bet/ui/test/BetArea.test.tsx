import { render, screen, fireEvent } from "@testing-library/react";
import BetArea from "../BetArea";
import "@testing-library/jest-dom";
import React from "react";
import { useState } from "react";

// Helper function to render BetArea with default props
const renderBetArea = (props = {}) => {
  const defaultProps = {
    selectedOutcome: "YES",
    amount: "",
    onAmountChange: jest.fn(),
    potentialPayout: "0₽",
    className: "",
  };
  return render(<BetArea {...defaultProps} {...props} />);
};

describe("BetArea", () => {
  test("renders initial state correctly", () => {
    renderBetArea();

    const input = screen.getByPlaceholderText("Сумма ставки");
    expect(input).toHaveValue(null);

    expect(screen.getByText("Купить YES")).toBeInTheDocument();
    expect(
      screen.queryByText(/потенциальный выигрыш/i)
    ).not.toBeInTheDocument();
  });

  test("renders correct button variant for NO outcome", () => {
    renderBetArea({ selectedOutcome: "NO" });
    expect(screen.getByText("Купить NO")).toBeInTheDocument();
  });

  test("applies custom className to container", () => {
    renderBetArea({ className: "test-class" });
    const container = document.querySelector('[class*="test-class"]');
    expect(container).toBeInTheDocument();
  });
});

describe("BetArea Input Component", () => {
  test("renders with correct attributes and styling", () => {
    renderBetArea();
    const input = screen.getByPlaceholderText("Сумма ставки");

    expect(input).toHaveAttribute("type", "number");
    expect(input).toHaveAttribute("placeholder", "Сумма ставки");
    expect(input).toHaveAttribute("min", "0");

    expect(input).toHaveClass("flex-1");
    expect(input).toHaveClass("text-lg");
    expect(input).toHaveClass("py-3");
    expect(input).toHaveClass("dark:text-black");
    expect(input).toHaveClass("text-white");
  });

  test("displays controlled value from amount prop", () => {
    renderBetArea({ amount: "150" });
    const input = screen.getByPlaceholderText("Сумма ставки");
    expect(input).toHaveValue(150);
  });

  test("triggers onAmountChange with numeric values", () => {
    const onAmountChange = jest.fn();
    renderBetArea({ onAmountChange });
    const input = screen.getByPlaceholderText("Сумма ставки");

    fireEvent.change(input, { target: { value: "200" } });
    expect(onAmountChange).toHaveBeenCalledWith("200");

    fireEvent.change(input, { target: { value: "0" } });
    expect(onAmountChange).toHaveBeenCalledWith("0");
  });
});
