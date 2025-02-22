import { TypeOfVote } from "../../../entities/market/types/common";

export const toLowercaseVote = (vote: TypeOfVote): Lowercase<TypeOfVote> =>
	vote.toLowerCase() as Lowercase<TypeOfVote>;
