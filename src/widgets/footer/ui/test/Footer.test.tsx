import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Footer from "../Footer"; // Adjust the import based on your file structure

describe("Footer Component", () => {
  test("renders footer with correct text", () => {
    const { getByText } = render(<Footer />);

    // Check for the main title text
    const title = getByText(/Vote/i);
    expect(title).toBeInTheDocument();

    // Check for the copyright text
    const currentYear = new Date().getFullYear();
    const copyrightText = getByText(`© ${currentYear} All rights reserved`);
    expect(copyrightText).toBeInTheDocument();
  });

  test("renders social links", () => {
    const { container } = render(<Footer />);

    // Check if social links are present
    const socialLinks = container.querySelectorAll("a");
    expect(socialLinks.length).toBe(2); // Expecting 2 social links (Twitter and Discord)

    // Check if specific links are present
    expect(socialLinks[0]).toHaveAttribute("href", "https://twitter.com");
    expect(socialLinks[1]).toHaveAttribute("href", "https://discord.com");
  });

  test("has correct classes applied", () => {
    const { container } = render(<Footer />);

    // Check if the footer has the correct class
    const footer = container.querySelector("footer");
    expect(footer).toHaveClass(
      "bg text-white border-t border-white dark:border-black"
    );

    // Check if the social links container has the correct class
    const socialContainer = screen.getByTestId("social-test-id");
    expect(socialContainer).toHaveClass(
      "sm:ml-auto sm:mt-0 mt-4 flex space-x-4"
    );
  });
});
