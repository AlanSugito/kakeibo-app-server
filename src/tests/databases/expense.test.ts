import { describe, expect, it } from "@jest/globals";
import { Expense, User } from "../../database";

describe("Expense repository", () => {
  it("should add user expense and cut user balance", async () => {
    const expense = await Expense.addExpense("1", {
      category_id: "1",
      date: new Date(),
      expense_type_id: "1",
      information: "Buy oreo",
      nominal: 5000,
    });
    const { expenses } = await Expense.get("1");

    const user = await User.getUserById("1");

    expect(expense).toBeDefined();
    expect(expense).not.toBeNull();
    expect(user.balance).toBe(95000);
    expect(expenses).not.toBeNull();
    expect(expenses).not.toHaveLength(0);
    await User.addBalance(user.id, 5000);
    await Expense.delete(user.id, expense.id);
  });

  it("should get user expenses", async () => {
    const { expenses } = await Expense.get("1");

    expect(expenses).toBeDefined();
    expect(expenses).not.toBeNull();
    expect(expenses).not.toHaveLength(0);
    expect(expenses.length).toBeLessThanOrEqual(10);
    expenses.forEach((expense) => {
      expect(expense).toHaveProperty("category");
      expect(expense).toHaveProperty("expenseType");
      expect(expense.category).toHaveProperty("name");
      expect(expense.expenseType).toHaveProperty("name");
    });
  });

  it("should get user biggest expenses", async () => {
    const result = await Expense.getBiggestExpenses("1");

    expect(result).toBeDefined();
    expect(result).not.toBeNull();
    expect(result).toBe(5000);
  });

  it("should get user average spent in a month", async () => {
    const result = await Expense.getAverageSpent("1", 2023);

    expect(result).toBeDefined();
    expect(result).not.toBeNull();
    expect(result).toBeGreaterThanOrEqual(4764);
  });

  it("should get user expenses with search query", async () => {
    const { expenses } = await Expense.get("1", { search: "food" });

    expect(expenses).toBeDefined();
    expect(expenses).not.toBeNull();
    expect(expenses).toBeDefined();
    expect(expenses).not.toBeNull();
    expect(expenses).not.toHaveLength(0);
    expect(expenses).toHaveLength(1);
  });

  it("should get user expenses with particular years", async () => {
    const { expenses } = await Expense.get("1", { years: 2022 });

    expect(expenses).toBeDefined();
    expect(expenses).not.toBeNull();
    expect(expenses).not.toHaveLength(0);
  });

  it("should get user expenses with particular month", async () => {
    const { expenses } = await Expense.get("1", { month: "Januari" });

    expect(expenses).toBeDefined();
    expect(expenses).not.toBeNull();
    expect(expenses).not.toHaveLength(0);
  });

  it("should get user expenses with particular month and years", async () => {
    const { expenses } = await Expense.get("1", {
      month: "Januari",
      years: 2022,
    });
    const expenses2 = await Expense.get("1", { month: "Januari", years: 2023 });

    expect(expenses).toBeDefined();
    expect(expenses).not.toBeNull();
    expect(expenses).not.toHaveLength(0);

    expect(expenses2.expenses).toBeDefined();
    expect(expenses2.expenses).not.toBeNull();
    expect(expenses2.expenses).toHaveLength(0);
  });

  it("should get user expenses with particular categories", async () => {
    const { expenses } = await Expense.get("1", { categories: ["1", "2"] });

    expect(expenses).toBeDefined();
    expect(expenses).not.toBeNull();
    expect(expenses).not.toHaveLength(0);
    expect(expenses.length).toBeLessThanOrEqual(10);
  });

  it("should get user expenses with particular expense types", async () => {
    const { expenses } = await Expense.get("1", { expenseTypes: ["2"] });
    const expenses2 = await Expense.get("1", { expenseTypes: ["3"] });

    expect(expenses).toBeDefined();
    expect(expenses).not.toBeNull();
    expect(expenses).not.toHaveLength(0);

    expect(expenses2.expenses).toBeDefined();
    expect(expenses2.expenses).not.toBeNull();
    expect(expenses2.expenses).toHaveLength(0);
  });

  it("should get user expenses with particular expense types and categories", async () => {
    const { expenses } = await Expense.get("1", {
      expenseTypes: ["2"],
      categories: ["1"],
    });

    expect(expenses).toBeDefined();
    expect(expenses).not.toBeNull();
    expect(expenses).not.toHaveLength(0);
  });

  it("should get user expense category stats", async () => {
    const result = await Expense.getSpentCategories("1", "Oktober", 2023);

    expect(result).toBeDefined();
    expect(result).not.toBeNull();
    expect(result).not.toHaveLength(0);
    result.forEach((res) => {
      expect(res).toBeDefined();
      expect(res).not.toBeNull();
      expect(res.category).toHaveProperty("name");
    });
  });

  it("should get user expenses with all filters", async () => {
    const { expenses } = await Expense.get("1", {
      search: "food",
      years: 2023,
      month: "Oktober",
      categories: ["1"],
      expenseTypes: ["1"],
    });

    expect(expenses).toBeDefined();
    expect(expenses).not.toBeNull();
    expect(expenses).not.toHaveLength(0);
    expect(expenses).toHaveLength(1);
  });

  it("should get users expense data at page 2", async () => {
    const { expenses } = await Expense.get("1", { page: 1 });

    expect(expenses).toBeDefined();
    expect(expenses).not.toBeNull();
    expect(expenses).not.toHaveLength(0);
    expect(expenses.length).toBeGreaterThanOrEqual(3);
  });

  it("should get users monthly stats", async () => {
    const stats = await Expense.getMonthlyStats("1", 2023);

    expect(stats).toBeDefined();
    expect(stats).not.toBeNull();
    expect(stats).not.toHaveLength(0);
    stats.forEach((stat) => {
      expect(stat).toBeDefined();
      expect(stat).not.toBeNull();
      expect(stat).toHaveProperty("year");
      expect(stat).toHaveProperty("month");
      expect(stat).toHaveProperty("nominal");
    });
  });
});
