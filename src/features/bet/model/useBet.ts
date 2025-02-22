import { useState } from "react";
import { TypeOfVote } from "../../../entities/market/types/common";

export const useBet = () => {
	const [selectedOutcome, setSelectedOutcome] = useState<TypeOfVote>("YES");
	const [amount, setAmount] = useState("");

	return { selectedOutcome, setSelectedOutcome, amount, setAmount };
};
