import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Input } from "../Input";
import React from "react";

describe("Input Component", () => {
  test("renders with default classes when no error", () => {
    render(<Input />);
    const input = screen.getByRole("textbox");

    expect(input).toHaveClass("w-full", "px-4", "py-2");
    expect(input).toHaveClass("border-2", "rounded-lg");
    expect(input).toHaveClass(
      "focus:outline-none",
      "focus:ring-2",
      "transition-colors"
    );

    expect(input).toHaveClass("border-gray-300");
    expect(input).toHaveClass(
      "dark:focus:border-blue-500",
      "focus:ring-blue-300"
    );
  });

  test("applies error styles when error prop is true", () => {
    render(<Input error />);
    const input = screen.getByRole("textbox");

    expect(input).toHaveClass("border-red-500", "focus:ring-red-200");

    expect(input).not.toHaveClass("border-gray-300");
    expect(input).not.toHaveClass("dark:focus:border-blue-500");
    expect(input).not.toHaveClass("focus:ring-blue-300");
  });

  test("merges custom className with default classes", () => {
    render(<Input className="custom-class" />);
    const input = screen.getByRole("textbox");

    expect(input).toHaveClass("custom-class");

    expect(input).toHaveClass("w-full", "px-4", "py-2");
  });

  test("passes additional props to the input element", () => {
    render(
      <Input
        placeholder="Test Placeholder"
        type="email"
        disabled
        value="Test Value"
      />
    );
    const input = screen.getByRole("textbox");

    expect(input).toHaveAttribute("placeholder", "Test Placeholder");
    expect(input).toHaveAttribute("type", "email");
    expect(input).toBeDisabled();
    expect(input).toHaveValue("Test Value");
  });

  test("combines error classes with custom className", () => {
    render(<Input error className="error-border" />);
    const input = screen.getByRole("textbox");

    expect(input).toHaveClass("error-border");
    expect(input).toHaveClass("border-red-500", "focus:ring-red-200");
  });
});
