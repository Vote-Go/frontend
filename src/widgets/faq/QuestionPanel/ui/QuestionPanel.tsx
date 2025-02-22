import { MdExpandMore } from "react-icons/md";
import { useQuestionPanel } from "../model/useQuestionPanel";
import { FAQItem } from "../../../../entities/faq/types/faq";

type QuestionPanel = Omit<FAQItem, "id">;

export const QuestionPanel: React.FC<QuestionPanel> = ({
	question,
	answer,
}) => {
	const { isOpen, toggle } = useQuestionPanel();

	return (
		<div className="text-md px-3 lg:px-6 xl:px-12">
			<div
				onClick={toggle}
				className="question flex justify-between items-center 
                 h-16 sm:h-20 md:h-22 lg:h-26 xl:h-28
                 border-white/25 outline-white/10 cursor-pointer"
			>
				<p className="sm:text-xl md:text-2xl lg:text-3xl text">
					{question}
				</p>
				<MdExpandMore
					className={`text text-2xl lg:text-6xl transition-transform ${
						isOpen ? "rotate-180" : ""
					}`}
				/>
			</div>
			<div
				className={`text sm:text-lg md:text-xl lg:text-2xl py-3 
                  transition-all ease-in-out overflow-hidden
                  ${isOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"}`}
			>
				{answer}
			</div>
		</div>
	);
};
