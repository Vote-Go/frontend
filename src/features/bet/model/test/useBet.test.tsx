import { render, screen, fireEvent } from "@testing-library/react";
import { useBet } from "../useBet";
import "@testing-library/jest-dom";
import React from "react";

const TestComponent = () => {
  const { selectedOutcome, setSelectedOutcome, amount, setAmount } = useBet();

  return (
    <div>
      <div data-testid="selected-outcome">{selectedOutcome}</div>
      <button onClick={() => setSelectedOutcome("NO")}>Set to NO</button>
      <input
        data-testid="amount-input"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
    </div>
  );
};

describe("useBet", () => {
  test("initializes with default values", () => {
    render(<TestComponent />);
    expect(screen.getByTestId("selected-outcome")).toHaveTextContent("YES");
    expect(screen.getByTestId("amount-input")).toHaveValue("");
  });

  test("updates selectedOutcome when setSelectedOutcome is called", () => {
    render(<TestComponent />);
    fireEvent.click(screen.getByText("Set to NO"));
    expect(screen.getByTestId("selected-outcome")).toHaveTextContent("NO");
  });

  test("updates amount when setAmount is called", () => {
    render(<TestComponent />);
    const input = screen.getByTestId("amount-input");

    fireEvent.change(input, { target: { value: "100" } });
    expect(input).toHaveValue("100");

    fireEvent.change(input, { target: { value: "" } });
    expect(input).toHaveValue("");
  });
});
