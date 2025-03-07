import { Hero } from "../widgets/hero";
import { Container } from "../shared/ui/Container";
import { faqData } from "../features/faq/lib/faq-data";
import { QuestionPanel } from "../widgets/faq/QuestionPanel/ui/QuestionPanel";
import React from "react";

const FAQ = () => {
  return (
    <Container>
      <Hero title="FAQ" subtitle="Часто задаваемые вопросы" />

      <div className="mt-8 sm:mt-12 lg:mt-20">
        {faqData.map((item, index) => (
          <QuestionPanel
            key={index}
            question={item.question}
            answer={item.answer}
          />
        ))}
      </div>
    </Container>
  );
};

export default FAQ;
