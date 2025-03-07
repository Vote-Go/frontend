import { render, screen } from "@testing-library/react";
import { DeveloperDefinition } from "../DeveloperDifinnition";
import "@testing-library/jest-dom";
import React from "react";

describe("DeveloperDefinition", () => {
  const mockProps = {
    name: "Alex",
    username: "HELLPES",
    role: "frontend",
    description: "<> just overrated as f </>",
  };

  test("renders the username correctly", () => {
    render(<DeveloperDefinition {...mockProps} />);
    const usernameElement = screen.getByText(mockProps.username);
    expect(usernameElement).toBeInTheDocument();
    expect(usernameElement).toHaveClass("text-center"); // Check for a specific class if needed
  });

 

  test("renders the description correctly", () => {
    render(<DeveloperDefinition {...mockProps} />);
    const descriptionElement = screen.getByText(mockProps.description);
    expect(descriptionElement).toBeInTheDocument();
    expect(descriptionElement).toHaveClass("text-center"); // Check for a specific class if needed
  });
});
