import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import AnimatedContainer from "../AnimatedContainer";
import "@testing-library/jest-dom";

beforeEach(() => {
  jest.spyOn(window, "requestAnimationFrame").mockImplementation((cb) => {
    cb(0);
    return 0;
  });
});

afterEach(() => {
  window.requestAnimationFrame.mockRestore();
});

describe("AnimatedContainer", () => {
  test("renders children correctly", () => {
    render(
      <AnimatedContainer>
        <div data-testid="test-child">Content</div>
      </AnimatedContainer>
    );
    expect(screen.getByTestId("test-child")).toBeInTheDocument();
  });

  test("applies 3D transform on mouse move", () => {
    const { container } = render(
      <AnimatedContainer>
        <div>Test</div>
      </AnimatedContainer>
    );
    const animatedDiv = container.firstChild as HTMLElement;

    // Mock getBoundingClientRect
    jest.spyOn(animatedDiv, "getBoundingClientRect").mockReturnValue({
      left: 0,
      top: 0,
      width: 100,
      height: 100,
      right: 100,
      bottom: 100,
      x: 0,
      y: 0,
      toJSON: () => {},
    });

    // Simulate mouse move at (50,50)
    fireEvent.mouseMove(animatedDiv, { clientX: 50, clientY: 50 });

    const expectedTransform =
      "perspective(700px) rotateX(-6deg) rotateY(-6deg) scale3d(0.90, 0.90, 0.90)";
    expect(animatedDiv.style.transform).toBe(expectedTransform);
  });

  test("resets transform on mouse leave", () => {
    const { container } = render(
      <AnimatedContainer>
        <div>Test</div>
      </AnimatedContainer>
    );
    const animatedDiv = container.firstChild as HTMLElement;

    // Mock getBoundingClientRect
    jest.spyOn(animatedDiv, "getBoundingClientRect").mockReturnValue({
      left: 0,
      top: 0,
      width: 100,
      height: 100,
      right: 100,
      bottom: 100,
      x: 0,
      y: 0,
      toJSON: () => {},
    });

    // First apply transform
    fireEvent.mouseMove(animatedDiv, { clientX: 50, clientY: 50 });
    // Then trigger mouse leave
    fireEvent.mouseLeave(animatedDiv);

    expect(animatedDiv.style.transform).toBe("");
  });

  test("handles edge positions correctly", () => {
    const { container } = render(
      <AnimatedContainer>
        <div>Test</div>
      </AnimatedContainer>
    );
    const animatedDiv = container.firstChild as HTMLElement;

    // Mock larger dimensions
    jest.spyOn(animatedDiv, "getBoundingClientRect").mockReturnValue({
      left: 100,
      top: 100,
      width: 200,
      height: 200,
      right: 300,
      bottom: 300,
      x: 100,
      y: 100,
      toJSON: () => {},
    });

    // Simulate mouse at (150,150) - center of 200x200 container
    fireEvent.mouseMove(animatedDiv, { clientX: 150, clientY: 150 });

    const expectedTransform =
      "perspective(700px) rotateX(-7.5deg) rotateY(-7.5deg) scale3d(0.90, 0.90, 0.90)";
    expect(animatedDiv.style.transform).toBe(expectedTransform);
  });

  test("gracefully handles missing ref", () => {
    // Mock useRef to return null
    jest.spyOn(React, "useRef").mockReturnValueOnce({ current: null });

    const consoleErrorMock = jest.spyOn(console, "error").mockImplementation();

    const { container } = render(
      <AnimatedContainer>
        <div>Test</div>
      </AnimatedContainer>
    );
    const animatedDiv = container.firstChild as HTMLElement;

    fireEvent.mouseMove(animatedDiv, { clientX: 50, clientY: 50 });

    expect(consoleErrorMock).not.toHaveBeenCalled();
    consoleErrorMock.mockRestore();
  });
});
