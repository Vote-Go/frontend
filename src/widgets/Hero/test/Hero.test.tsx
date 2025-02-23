import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Hero from "../Hero";

describe("Hero Component", () => {
	it("renders title correctly with proper tag and content", () => {
		render(<Hero title="Test Title" />);

		const title = screen.getByTestId("hero-title");
		expect(title).toBeInTheDocument();
		expect(title.tagName).toBe("H1");
		expect(title).toHaveTextContent("Test Title");
	});

	it("renders title correctly with proper tag and fully content", () => {
		render(<Hero title="Test Title" subtitle="test subtitle" />);

		const title = screen.getByTestId("hero-title");
		const subtitle = screen.getByTestId("hero-subtitle");

		expect(title).toBeInTheDocument();
		expect(title.tagName).toBe("H1");
		expect(title).toHaveTextContent("Test Title");

		expect(subtitle).toBeInTheDocument();
		expect(subtitle.tagName).toBe("P");
		expect(subtitle).toHaveTextContent("test subtitle");
	});
});
