import { useState } from "react";

export const useQuestionPanel = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return { isOpen, toggle };
};
