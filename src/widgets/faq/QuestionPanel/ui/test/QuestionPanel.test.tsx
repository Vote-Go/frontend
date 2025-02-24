import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { QuestionPanel } from "../QuestionPanel"; // Убедитесь, что путь правильный
import { useQuestionPanel } from "../../model/useQuestionPanel";

jest.mock("../../model/useQuestionPanel");

describe("QuestionPanel", () => {
  const question = "What is React?";
  const answer = "React is a JavaScript library for building user interfaces.";

  beforeEach(() => {
    // reset after each test
    (useQuestionPanel as jest.Mock).mockReturnValue({
      isOpen: false,
      toggle: jest.fn(),
    });
  });

  test("должен отображать вопрос", () => {
    render(<QuestionPanel question={question} answer={answer} />);
    expect(screen.getByText(question)).toBeInTheDocument();
  });

  test("должен скрывать ответ по умолчанию", () => {
    (useQuestionPanel as jest.Mock).mockReturnValue({
      isOpen: false,
      toggle: jest.fn(),
    });
    render(<QuestionPanel question={question} answer={answer} />);
    const answerElement = screen.getByTestId("question-panel-answer");

    expect(answerElement).toHaveClass("max-h-0", "opacity-0");
  });

  test("должен открывать ответ при клике на вопрос", () => {
    const toggleMock = jest.fn();
    (useQuestionPanel as jest.Mock).mockReturnValue({
      isOpen: true,
      toggle: toggleMock,
    });
    render(<QuestionPanel question={question} answer={answer} />);
    const questionElement = screen.getByText(question);

    fireEvent.click(questionElement);

    expect(toggleMock).toHaveBeenCalledTimes(1);
  });

  test("должен закрывать ответ при повторном клике на вопрос", () => {
    const toggleMock = jest.fn();
    (useQuestionPanel as jest.Mock).mockReturnValue({
      isOpen: true,
      toggle: toggleMock,
    });
    render(<QuestionPanel question={question} answer={answer} />);
    const questionElement = screen.getByText(question);

    // Открываем ответ
    fireEvent.click(questionElement);

    expect(toggleMock).toHaveBeenCalledTimes(1);

    // Закрываем ответ
    fireEvent.click(questionElement);

    expect(toggleMock).toHaveBeenCalledTimes(2);
  });
});
