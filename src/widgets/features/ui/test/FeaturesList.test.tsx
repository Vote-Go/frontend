// FeaturesList.test.tsx
import { render, screen } from "@testing-library/react";
import { FeaturesList, FeatureListItem } from "../FeaturesList";
import "@testing-library/jest-dom";
import React from "react";

describe("FeaturesList", () => {
  const mockItems = [
    {
      id: "1",
      title: "Feature One",
      description: "Description for feature one",
    },
    {
      id: "2",
      title: "Feature Two",
      description: "Description for feature two",
    },
  ];

  test("renders all feature items and the image correctly", () => {
    render(<FeaturesList items={mockItems} />);

    // Check all titles and descriptions are present
    expect(screen.getByText("Feature One")).toBeInTheDocument();
    expect(screen.getByText("Description for feature one")).toBeInTheDocument();
    expect(screen.getByText("Feature Two")).toBeInTheDocument();
    expect(screen.getByText("Description for feature two")).toBeInTheDocument();

    // Check image attributes
    const image = screen.getByAltText("Platform features");
    expect(image).toHaveAttribute("src", "/feature.jpeg");
    expect(image).toHaveAttribute("width", "400");
    expect(image.parentElement).toHaveClass(
      "border-2",
      "border-accent",
      "rounded-4xl"
    );
    expect(image).toHaveClass("rounded-4xl", "p-4");
  });

  test("renders nothing when items array is empty", () => {
    render(<FeaturesList items={[]} />);

    // Ensure no feature items are rendered
    expect(screen.queryByText("Feature One")).not.toBeInTheDocument();
    expect(screen.queryByText("Feature Two")).not.toBeInTheDocument();

    // Image should still be present
    expect(screen.getByAltText("Platform features")).toBeInTheDocument();
  });
});

describe("FeatureListItem", () => {
  test("renders title and description with correct styles", () => {
    render(
      <FeatureListItem title="Test Title" description="Test Description" />
    );

    // Check title and description presence
    expect(
      screen.getByRole("heading", { name: "Test Title" })
    ).toBeInTheDocument();
    expect(screen.getByText("Test Description")).toBeInTheDocument();

    // Check description styles
    const description = screen.getByText("Test Description");
    expect(description).toHaveClass("hover-text", "leading-relaxed");
  });
});
