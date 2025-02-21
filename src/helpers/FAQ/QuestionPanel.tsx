import { useState } from "react";
import { MdExpandMore, MdExpandLess } from "react-icons/md";

interface QuestionPanelProps {
	question: string;
	answer: string;
}

const QuestionPanel: React.FC<QuestionPanelProps> = ({ question, answer }) => {
	const [showAnswer, setShowAnswer] = useState(false);

	return (
		<div className="text-md px-3 lg:px-6 xl:px-12 ">
			<div
				onClick={() => setShowAnswer(!showAnswer)}
				className="question flex justify-between border-white/25 outline-white/10   h-16 sm:h-20 md:h-22 lg:h-26 xl:h-28 items-center "
			>
				<p className="sm:text-xl md:text-2xl lg:text-3xl text">
					{question}
				</p>

				<MdExpandMore
					className={`text-2xl lg:text-6xl cursor-pointer transition-transform text ${
						showAnswer ? "rotate-180" : ""
					}`}
				/>
			</div>
			<p
				className={`sm:text-lg md:text-xl lg:text-2xl py-3 transition-all text-secondary ease-in-out ${
					showAnswer
						? "max-h-40 opacity-100"
						: "max-h-0 opacity-0 overflow-hidden"
				}`}
			>
				{answer}
			</p>
		</div>
	);
};

export default QuestionPanel;
