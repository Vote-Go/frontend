import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Container from "../Container";
import React from "react";

const CONTAINER_SECTION_TEST_ID = "container-section";


describe("shared Container", () => {
	it("should render base classes without border and custom className", () => {
		render(
			<Container>
				<p>Test</p>
			</Container>
		);

		const section = screen.getByTestId(CONTAINER_SECTION_TEST_ID);

		expect(section).toHaveClass("container");
		expect(section).toHaveClass("mx-auto");
		expect(section).toHaveClass("px-4");
		expect(section).toHaveClass("py-20");

		expect(section).not.toHaveClass("border-b");
		expect(section).not.toHaveClass("border-gray-300");
		expect(section).not.toHaveClass("dark:border-gray-600");
	});

	it("should add border classes when border prop is true", () => {
		render(
			<Container border>
				<p>Test</p>
			</Container>
		);

		const section = screen.getByTestId(CONTAINER_SECTION_TEST_ID);

		expect(section).toHaveClass("border-b");
		expect(section).toHaveClass("border-gray-300");
		expect(section).toHaveClass("dark:border-gray-600");
	});

	it("should merge custom className correctly", () => {
		const customClass = "custom-class";
		render(
			<Container className={customClass}>
				<p>Test</p>
			</Container>
		);

		const section = screen.getByTestId(CONTAINER_SECTION_TEST_ID);

		expect(section).toHaveClass(customClass);

		expect(section).toHaveClass("container");
		expect(section).toHaveClass("mx-auto");
		expect(section).toHaveClass("px-4");
		expect(section).toHaveClass("py-20");
	});

	it("should prioritize custom border classes", () => {
		const customBorder = "border-red-500";
		render(
			<Container border className={customBorder}>
				<p>Test</p>
			</Container>
		);

		const section = screen.getByTestId(CONTAINER_SECTION_TEST_ID);
		expect(section).toHaveClass("border-b");
		expect(section).toHaveClass(customBorder);
		expect(section).not.toHaveClass("border-gray-300");
	});

	it("should handle conflicting classes", () => {
		render(
			<Container className="py-10">
				<p>Test</p>
			</Container>
		);

		const section = screen.getByTestId(CONTAINER_SECTION_TEST_ID);
		expect(section).toHaveClass("py-10");
		expect(section).not.toHaveClass("py-20");
	});
});
