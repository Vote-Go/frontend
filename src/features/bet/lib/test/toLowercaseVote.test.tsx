import { toLowercaseVote } from "../toLowercaseVote";
import { TypeOfVote } from "../../../../entities/market/types/common";

describe("toLowercaseVote", () => {
  test('converts "YES" to "yes"', () => {
    const vote: TypeOfVote = "YES";
    const result = toLowercaseVote(vote);
    expect(result).toBe("yes");
  });

  test('converts "NO" to "no"', () => {
    const vote: TypeOfVote = "NO";
    const result = toLowercaseVote(vote);
    expect(result).toBe("no");
  });

  test('converts mixed case "Yes" to "yes"', () => {
    const vote = "Yes" as TypeOfVote; // Force TypeOfVote type
    const result = toLowercaseVote(vote);
    expect(result).toBe("yes");
  });

  test('converts mixed case "No" to "no"', () => {
    const vote = "No" as TypeOfVote; // Force TypeOfVote type
    const result = toLowercaseVote(vote);
    expect(result).toBe("no");
  });
});
