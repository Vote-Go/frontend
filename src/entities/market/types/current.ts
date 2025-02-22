import { LowercaseVote } from "./common";

export interface OutcomeStats {
  probability: number;
  volume: number;
  price: number; 
}

export type CurrentStats = {
  [key in LowercaseVote]: OutcomeStats;
}
