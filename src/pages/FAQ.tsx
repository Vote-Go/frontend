import React from "react";
import { ANSWER_QUESTION } from "../helpers/FAQ/answerQuestions";
import QuestionPanel from "../helpers/FAQ/QuestionPanel";

const FAQ = () => {
  return (
    <>
      <p className="text-2xl sm:text-4xl lg:text-6xl text-center">FAQ</p>

      <div className="mt-8 sm:mt-12 lg:mt-20">
        {ANSWER_QUESTION.map((answer_question) => {
          return (
            <QuestionPanel
              question={answer_question.question}
              answer={answer_question.answer}
            />
          );
        })}
      </div>
    </>
  );
};

export default FAQ;
