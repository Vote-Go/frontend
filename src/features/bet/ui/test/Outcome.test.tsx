import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Outcome from "../Outcome";
import "@testing-library/jest-dom";

const defaultProps = {
  outcome: "YES" as TypeOfVote,
  selected: false,
  price: 150,
  probability: 45,
  onClick: jest.fn(),
};

describe("Outcome Component", () => {
  test("renders YES outcome with correct content and styles when unselected", () => {
    render(<Outcome {...defaultProps} />);

    expect(screen.getByText("YES")).toBeInTheDocument();
    expect(screen.getByText("150₽")).toBeInTheDocument();
    expect(screen.getByText("45% вероятность")).toBeInTheDocument();

    const button = screen.getByRole("button");
    expect(button).toHaveClass("border-transparent", "bg-gray-50");
    expect(button).not.toHaveClass("shadow-lg");
    expect(screen.getByText("YES")).toHaveClass("text-green-600");
  });

  test("applies selected styles for YES outcome", () => {
    render(<Outcome {...defaultProps} selected outcome="YES" />);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("border-green-500", "bg-green-50", "shadow-lg");
  });

  test("applies selected styles for NO outcome", () => {
    render(<Outcome {...defaultProps} selected outcome="NO" />);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("border-red-500", "bg-red-50", "shadow-lg");
    expect(screen.getByText("NO")).toHaveClass("text-red-600");
  });

  test("triggers onClick handler when clicked", () => {
    const handleClick = jest.fn();
    render(<Outcome {...defaultProps} onClick={handleClick} />);
    fireEvent.click(screen.getByRole("button"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test("merges custom className with default classes", () => {
    render(<Outcome {...defaultProps} className="custom-class" />);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("custom-class");
    expect(button).toHaveClass("border-transparent");
  });

  test("handles zero values correctly", () => {
    render(<Outcome {...defaultProps} price={0} probability={0} />);
    expect(screen.getByText("0₽")).toBeInTheDocument();
    expect(screen.getByText("0% вероятность")).toBeInTheDocument();
  });
});
