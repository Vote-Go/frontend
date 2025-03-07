import { render, screen } from "@testing-library/react";
import MainPage from "../MainPage";
import { StatsItem } from "../../widgets/stats/ui/StatsItem";
import { Container } from "../../shared/ui/Container";
import { Hero } from "../../widgets/hero";
import { StatsGrid } from "../../widgets/stats/ui/StatsGrid";
import { FeaturesBlock } from "../../widgets/features/ui/FeaturesBlock";
import { TeamSection } from "../../widgets/team/TeamSection";
import React from "react";
import "@testing-library/jest-dom";

jest.mock("../../features/main/lib/constants", () => ({
  statsItems: [{ id: "1", label: "Mock Stat", value: "100" }],
}));

jest.mock("../../shared/ui/Container", () => ({
  Container: jest.fn(({ children, border }) => (
    <div data-testid="container" data-border={border ? "true" : "false"}>
      {children}
    </div>
  )),
}));

jest.mock("../../widgets/hero", () => ({
  Hero: jest.fn(({ title, subtitle }) => (
    <div data-testid="hero">
      <h1>{title}</h1>
      <h2>{subtitle}</h2>
    </div>
  )),
}));

jest.mock("../../widgets/stats/ui/StatsGrid", () => ({
  StatsGrid: jest.fn(({ items }) => (
    <div data-testid="stats-grid">{JSON.stringify(items)}</div>
  )),
}));

jest.mock("../../widgets/features/ui/FeaturesBlock", () => ({
  FeaturesBlock: jest.fn(() => <div data-testid="features-block" />),
}));

jest.mock("../../widgets/team/TeamSection", () => ({
  TeamSection: jest.fn(() => <div data-testid="team-section" />),
}));

describe("MainPage Component", () => {
  test("renders Hero in a bordered container with correct props", () => {
    render(<MainPage />);

    expect(screen.getByTestId("hero")).toBeInTheDocument();
    expect(screen.getByText("Predict. Vote. Earn.")).toBeInTheDocument();
    expect(
      screen.getByText(
        "Decentralized prediction market platform where your insight meets opportunity"
      )
    ).toBeInTheDocument();

    const containers = screen.getAllByTestId("container");
    expect(containers[0]).toHaveAttribute("data-border", "true");
  });

  test("renders FeaturesBlock in a bordered container", () => {
    render(<MainPage />);

    expect(screen.getByTestId("features-block")).toBeInTheDocument();

    const containers = screen.getAllByTestId("container");
    expect(containers[1]).toHaveAttribute("data-border", "true");
  });

  test("renders TeamSection at the end", () => {
    render(<MainPage />);
    expect(screen.getByTestId("team-section")).toBeInTheDocument();
  });

  test("renders components in correct order", () => {
    const { container } = render(<MainPage />);
    const children = Array.from(container.children);

    expect(children[0]).toHaveAttribute("data-testid", "container"); // Hero container
    expect(children[1]).toHaveAttribute("data-testid", "stats-grid"); // StatsGrid
    expect(children[2]).toHaveAttribute("data-testid", "container"); // FeaturesBlock container
    expect(children[3]).toHaveAttribute("data-testid", "team-section"); // TeamSection
  });
});
