import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { DeveloperCard } from "../DeveloperCard";
import { DeveloperDefinition } from "../../../../entities/developer/ui/DeveloperDifinnition";
import "@testing-library/jest-dom";

jest.mock("../../../../entities/developer/ui/DeveloperDifinnition", () => ({
  DeveloperDefinition: jest.fn(() => <div>Mock Developer Content</div>),
}));

const mockDeveloper = {
  githubLink: "https://github.com/testuser",
  name: "Test Developer",
};

describe("DeveloperCard", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("applies correct styling classes", () => {
    render(
      <MemoryRouter>
        <DeveloperCard {...mockDeveloper} />
      </MemoryRouter>
    );

    const link = screen.getByRole("link");
    expect(link).toHaveClass(
      "flex",
      "h-full",
      "flex-col",
      "gap-4",
      "rounded-xl",
      "border",
      "border-white",
      "px-4",
      "py-6",
      "sm:px-6",
      "sm:py-8",
      "dark:border-black"
    );
  });

  test("handles empty githubLink gracefully", () => {
    const invalidDeveloper = { ...mockDeveloper, githubLink: "" };

    render(
      <MemoryRouter>
        <DeveloperCard {...invalidDeveloper} />
      </MemoryRouter>
    );

    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/");
  });
});
