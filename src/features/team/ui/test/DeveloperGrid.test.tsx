import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { DeveloperGrid } from "../DeveloperGrid";
import { DEVELOPERS } from "../../lib/developers";
import { AnimatedContainer } from "../../../../shared/ui/Container";
import "@testing-library/jest-dom";

// Mock DEVELOPERS data
jest.mock("../../lib/developers", () => ({
  DEVELOPERS: [
    { githubLink: "https://github.com/dev1", name: "Dev 1" },
    { githubLink: "https://github.com/dev2", name: "Dev 2" },
    { githubLink: "https://github.com/dev3", name: "Dev 3" },
    { githubLink: "https://github.com/dev4", name: "Dev 4" },
    { githubLink: "https://github.com/dev5", name: "Dev 5" },
    // Add more mock developers if needed
  ],
}));

// Mock AnimatedContainer
jest.mock("../../../../shared/ui/Container", () => ({
  AnimatedContainer: ({ children }) => (
    <div data-testid="animated-container">{children}</div>
  ),
}));

describe("DeveloperGrid", () => {
  test("renders grid structure with correct developers and styles", () => {
    render(
      <MemoryRouter>
        <DeveloperGrid />
      </MemoryRouter>
    );

    // Verify grid container classes
    const gridContainer = screen.getByTestId("developer-grid");
    expect(gridContainer).toHaveClass(
      "my-6",
      "grid",
      "grid-cols-3",
      "grid-rows-2",
      "gap-4"
    );

    // Check all developer cards
    const developerLinks = screen.getAllByRole("link");
    expect(developerLinks).toHaveLength(5);

    // Verify first four developers from slice
    expect(developerLinks[0]).toHaveAttribute("href", DEVELOPERS[0].githubLink);
    expect(developerLinks[1]).toHaveAttribute("href", DEVELOPERS[1].githubLink);
    expect(developerLinks[2]).toHaveAttribute("href", DEVELOPERS[2].githubLink);
    expect(developerLinks[3]).toHaveAttribute("href", DEVELOPERS[3].githubLink);

    // Verify fifth developer from index 4
    expect(developerLinks[4]).toHaveAttribute("href", DEVELOPERS[4].githubLink);

    // Check AnimatedContainer wrappers
    const animatedContainers = screen.getAllByTestId("animated-container");
    expect(animatedContainers).toHaveLength(5);

    // Verify special styling for fifth item
    const fifthContainer = animatedContainers[4].parentElement;
    expect(fifthContainer).toHaveClass("...");
  });
});
