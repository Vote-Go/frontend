import { useState } from "react";
import { MdExpandMore, MdExpandLess } from "react-icons/md";

interface QuestionPanelProps {
  question: string;
  answer: string;
}

// a block of question-answer texts
const QuestionPanel: React.FC<QuestionPanelProps> = ({ question, answer }) => {
  const [showAnswer, setShowAnswer] = useState(false);

  return (
    <div className="text-md px-3 lg:px-6 xl:px-12 hover:cursor-pointer">
      <div
        onClick={() => setShowAnswer(!showAnswer)}
        className="question flex justify-between border-white/25 outline-white/10 border-t-1  h-16 sm:h-20 md:h-22 lg:h-26 xl:h-28 items-center "
      >
        <p className="sm:text-2xl md:text-3xl lg:text-4xl">{question}</p>
        {showAnswer ? (
          <MdExpandLess className="text-3xl lg:text-7xl" />
        ) : (
          <MdExpandMore className="text-3xl lg:text-7xl" />
        )}
      </div>
      {showAnswer && (
        <p className="sm:text-xl md:text-2xl lg:text-3xl py-3">{answer}</p>
      )}
    </div>
  );
};

export default QuestionPanel;
