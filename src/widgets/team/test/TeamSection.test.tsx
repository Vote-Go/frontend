import { render, screen } from "@testing-library/react";
import { TeamSection } from "../TeamSection";
import React from "react";
import "@testing-library/jest-dom";

jest.mock("../../../features/team/ui/DeveloperGrid", () => ({
  DeveloperGrid: () => <div data-testid="developer-grid" />,
}));

describe("TeamSection Component", () => {
  test("renders title with correct styling", () => {
    render(<TeamSection />);
    const title = screen.getByText("Our Core Team");

    expect(title).toBeInTheDocument();
    expect(title).toHaveClass(
      "!text-3xl",
      "font-bold",
      "text-center",
      "mb-12",
      "title"
    );
  });

  test("renders DeveloperGrid component", () => {
    render(<TeamSection />);
    const developerGrid = screen.getByTestId("developer-grid");
    expect(developerGrid).toBeInTheDocument();
  });

  test("applies correct container classes", () => {
    const { container } = render(<TeamSection />);
    const contentContainer = container.querySelector("div.container");

    expect(contentContainer).toHaveClass("container", "mx-auto", "px-4");
  });

  test("maintains proper component structure", () => {
    render(<TeamSection />);
    const title = screen.getByText("Our Core Team");
    const developerGrid = screen.getByTestId("developer-grid");

    // Verify DOM order: title comes before developer grid
    expect(title.compareDocumentPosition(developerGrid)).toBe(
      Node.DOCUMENT_POSITION_FOLLOWING
    );
  });
});
