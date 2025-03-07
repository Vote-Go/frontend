import { render, screen } from "@testing-library/react";
import NotFound from "../NotFound";
import { Hero } from "../../widgets/hero";
import { Container } from "../../shared/ui/Container";
import { Link } from "react-router";
import React from "react";
import "@testing-library/jest-dom";

jest.mock("../../widgets/hero", () => ({
  Hero: jest.fn(({ title, subtitle }) => (
    <div data-testid="mock-hero">
      <h1>{title}</h1>
      <h2>{subtitle}</h2>
    </div>
  )),
}));

jest.mock("../../shared/ui/Container", () => ({
  Container: jest.fn(({ children }) => (
    <div data-testid="mock-container">{children}</div>
  )),
}));

jest.mock("react-router", () => ({
  Link: jest.fn(({ to, children, className }) => (
    <a href={to} className={className} data-testid="mock-link">
      {children}
    </a>
  )),
}));

describe("NotFound Component", () => {
  test("renders Hero with correct title and subtitle", () => {
    render(<NotFound />);

    // Verify Hero content
    expect(screen.getByTestId("mock-hero")).toBeInTheDocument();
    expect(screen.getByText("Ooopss.. 404 Error!")).toBeInTheDocument();
    expect(
      screen.getByText("Seems like this page does not exist:(")
    ).toBeInTheDocument();
  });

  test("renders return home link with proper attributes", () => {
    render(<NotFound />);

    const link = screen.getByTestId("mock-link");
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/");
    expect(link).toHaveTextContent("Go back to Vote & Go!");
    expect(link).toHaveClass("text-xl", "sm:text-3xl", "underline");
  });

  test("wraps content in Container component", () => {
    render(<NotFound />);
    expect(screen.getByTestId("mock-container")).toBeInTheDocument();
  });

  test("applies correct styling to return home section", () => {
    render(<NotFound />);
    const returnSection = screen
      .getByText("Go back to Vote & Go!")
      .closest("div");

    expect(returnSection).toHaveClass("returnHome");
    expect(returnSection).toHaveClass("flex", "justify-center");
  });
});
