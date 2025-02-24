import React from "react";
import { render } from "@testing-library/react";
import ThemeIcon from "../ThemeIcon"; // Adjust the import based on your file structure

describe("ThemeIcon Component", () => {
  test("renders dark mode icon when darkMode is true", () => {
    const { getByAltText } = render(<ThemeIcon darkMode={true} />);

    const darkIcon = getByAltText("Темная тема");
    const lightIcon = getByAltText("Светлая тема");

    // Check that the dark icon is visible and the light icon is hidden
    expect(darkIcon.className).toContain("scale-110");
    expect(darkIcon.className).toContain("opacity-100");
    expect(lightIcon.className).toContain("scale-90");
    expect(lightIcon.className).toContain("opacity-0");
  });

  test("renders light mode icon when darkMode is false", () => {
    const { getByAltText } = render(<ThemeIcon darkMode={false} />);

    const darkIcon = getByAltText("Темная тема");
    const lightIcon = getByAltText("Светлая тема");

    // Check that the light icon is visible and the dark icon is hidden
    expect(darkIcon.className).toContain("scale-90");
    expect(darkIcon.className).toContain("opacity-0");
    expect(lightIcon.className).toContain("scale-110");
    expect(lightIcon.className).toContain("opacity-100");
  });
});
