import { describe, expect, it } from "@jest/globals";
import { Income } from "../database";
import { APIError } from "../utils";

describe("Income repository", () => {
  it("should add a user's income", async () => {
    const income = await Income.addIncome("2", {
      date: new Date(),
      nominal: 20000,
      information: "test income",
    });
    expect(income).toBeDefined();
    expect(income).not.toBeNull();
    const incomes = await Income.get("2", {
      month: "Oktober",
      year: 2023,
    });

    expect(incomes).toBeDefined();
    expect(incomes).not.toBeNull();
    expect(incomes).toHaveLength(1);
    await Income.delete("2", income.id);
  });

  it("should get one data", async () => {
    const incomes = await Income.get("1", {
      search: "AgAin",
      month: "Oktober",
      year: 2023,
    });
    expect(incomes).toBeDefined();
    expect(incomes).not.toBeNull();
    expect(incomes).toHaveLength(1);
  });

  it("should evaluate the average user income per month", async () => {
    const average = await Income.getAveragePerMonth("1", 2023);
    expect(average).toBeDefined();
    expect(average).not.toBeNull();
    expect(average).toBe(20000);
  });

  it("should return monthly statistic field", async () => {
    const stats = await Income.getMonthlyStats("1", 2023);
    expect(stats).toBeDefined();
    expect(stats).not.toBeNull();
    expect(stats).toHaveLength(12);
    stats.forEach((stat) => {
      expect(stat).not.toBeNull();
      expect(stat).toHaveProperty("month");
      expect(stat).toHaveProperty("year");
      expect(stat).toHaveProperty("nominal");
    });
  });

  it("should throw error user not found", async () => {
    try {
      await Income.get("10");
    } catch (error) {
      expect(error).toBeDefined();
      expect(error).not.toBeNull();
      expect(error).toBeInstanceOf(APIError);
      expect(error).toHaveProperty("status");
      expect(error).toHaveProperty("message");
      if (error instanceof APIError) {
        expect(error.status).toBe(404);
        expect(error.message).toBe("user not found");
      }
    }
  });
});
