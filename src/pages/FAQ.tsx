import { ANSWER_QUESTION } from "../helpers/FAQ/answerQuestions";
import QuestionPanel from "../helpers/FAQ/QuestionPanel";
import { Container } from "../shared/Container";
import Hero from "../widgets/Hero/Hero";

const FAQ = () => {
	return (
		<Container>
			<Hero title="FAQ" subtitle="Frequently Asked Questions" />

			<div className="mt-8 sm:mt-12 lg:mt-20">
				{ANSWER_QUESTION.map((answer_question) => (
					<>
						<QuestionPanel
							question={answer_question.question}
							answer={answer_question.answer}
						/>
					</>
				))}
			</div>
		</Container>
	);
};

export default FAQ;
