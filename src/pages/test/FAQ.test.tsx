import { render, screen } from "@testing-library/react";
import FAQ from "../FAQ";
import { faqData } from "../../features/faq/lib/faq-data";
import "@testing-library/jest-dom";
import React from "react";

// Mock FAQ data
jest.mock("../../features/faq/lib/faq-data", () => ({
  faqData: [
    {
      question: "What is the platform about?",
      answer: "A prediction market platform for event outcomes.",
    },
    {
      question: "How do I place a bet?",
      answer: "Select a market, choose an outcome, and enter your stake.",
    },
  ],
}));

describe("FAQ Component", () => {
  test("renders Hero section with correct title and subtitle", () => {
    render(<FAQ />);
    expect(screen.getByText("FAQ")).toBeInTheDocument();
    expect(screen.getByText("Часто задаваемые вопросы")).toBeInTheDocument();
  });

  test("renders all FAQ items from data", () => {
    render(<FAQ />);
    faqData.forEach((item) => {
      expect(screen.getByText(item.question)).toBeInTheDocument();
      expect(screen.getByText(item.answer)).toBeInTheDocument();
    });
  });

  test("displays proper number of FAQ items", () => {
    render(<FAQ />);
    const questionPanels = screen.getAllByTestId("question-panel-answer");
    expect(questionPanels).toHaveLength(faqData.length);
  });
});
