import React from "react";
import { render, screen, waitFor, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import { StatsItem } from "../StatsItem";
import { useInView } from "react-intersection-observer";

// Мокаем хук useInView, чтобы симулировать, что элемент находится в области видимости

const STAT_COUNTER_TEST_ID = "stat-item-header";
const STAT_LABEL_TEST_ID = "stat-item-label";

jest.mock("react-intersection-observer", () => ({
	useInView: jest.fn(),
}));

describe("StatsItem Component", () => {
	const mockUseInView = useInView as jest.Mock;

	beforeEach(() => {
		mockUseInView.mockReturnValue({
			ref: jest.fn(),
			inView: true,
		});

		jest.useFakeTimers();
	});

	afterEach(() => {
		jest.useRealTimers();
	});

	it("should display the correct label and value", async () => {
		render(<StatsItem value={100} label="Items" />);

		expect(screen.getByTestId(STAT_LABEL_TEST_ID)).toHaveTextContent(
			"Items"
		);

		act(() => {
			jest.advanceTimersByTime(2500);
		});

		await waitFor(() => {
			expect(screen.getByTestId(STAT_COUNTER_TEST_ID)).toHaveTextContent(
				"100"
			);
		});
	});

	it("should not show the CountUp animation if not in view", async () => {
		mockUseInView.mockReturnValue({
			ref: jest.fn(),
			inView: false,
		});

		render(<StatsItem value={100} label="Items" />);

		const countUpElement = screen.queryByTestId(STAT_COUNTER_TEST_ID);
		expect(countUpElement).not.toContainHTML("100"); // анимация не рендерится
	});

	it("should show the correct number of decimals", async () => {
		render(<StatsItem value={100.5} label="Items" />);

		act(() => {
			jest.advanceTimersByTime(2500);
		});

		await waitFor(() => {
			expect(screen.getByTestId(STAT_COUNTER_TEST_ID)).toHaveTextContent(
				"100.5"
			);
		});
	});
});
