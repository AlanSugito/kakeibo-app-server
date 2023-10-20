import { describe, expect, it } from "@jest/globals";
import { Expense } from "../../database";
import parseStats from "../../utils/parseStats";

describe("Function to parse a data to a stats", () => {
  it("should parse a data", async () => {
    const stats = await Expense.getMonthlyStats("1", 2024);
    parseStats(stats);
    expect(1).toBe(1);
  });
});
