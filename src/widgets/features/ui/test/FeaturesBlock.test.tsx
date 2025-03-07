// FeaturesBlock.test.tsx
import { render, screen } from "@testing-library/react";
import { FeaturesBlock } from "../FeaturesBlock";
import { features } from "../../../../features/main/lib/constants";
import "@testing-library/jest-dom";
import React from "react";

jest.mock("../../../../features/main/lib/constants", () => ({
  features: [
    {
      id: "1",
      title: "Mock Feature 1",
      description: "Description for mock feature 1",
    },
    {
      id: "2",
      title: "Mock Feature 2",
      description: "Description for mock feature 2",
    },
  ],
}));

jest.mock("../FeaturesList", () => ({
  FeaturesList: jest.fn(({ items }) => (
    <div data-testid="mock-features-list">{JSON.stringify(items)}</div>
  )),
}));

describe("FeaturesBlock", () => {
  test("renders the title and passes features to FeaturesList", () => {
    render(<FeaturesBlock />);

    expect(screen.getByText("Platform Features")).toBeInTheDocument();
    const title = screen.getByRole("heading", { level: 2 });
    expect(title).toHaveClass(
      "!text-3xl",
      "font-bold",
      "text-center",
      "mb-12",
      "title"
    );

    expect(screen.getByTestId("mock-features-list")).toBeInTheDocument();
    expect(features).toHaveLength(2);
    expect(features[0].title).toBe("Mock Feature 1");
  });

  test("applies the correct section styling", () => {
    const { container } = render(<FeaturesBlock />);
    const section = container.querySelector("section");
    expect(section).toHaveClass("py-16");
  });
});
