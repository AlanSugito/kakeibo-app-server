import { describe, expect, it } from "@jest/globals";
import { Expense, User } from "../database";

describe("Expense repository", () => {
  it("should add user expense and cut user balance", async () => {
    const expense = await Expense.addExpense("1", {
      category_id: "1",
      date: new Date(),
      expense_type_id: "1",
      information: "Buy an food",
      nominal: 5000,
    });
    const expenses = await Expense.get("1");

    const user = await User.getUserById("1");

    expect(expense).toBeDefined();
    expect(expense).not.toBeNull();
    expect(user.balance).toBe(95000);
    expect(expenses).not.toBeNull();
    expect(expenses).not.toHaveLength(0);
    await User.addBalance("1", 5000);
    await Expense.delete("1", expense.id);
  });

  it("should get user expenses", async () => {
    const expenses = await Expense.get("1");

    expect(expenses).toBeDefined();
    expect(expenses).not.toBeNull();
    expect(expenses).not.toHaveLength(0);
    expect(expenses.length).toBeLessThan(10);
    expenses.forEach((expense) => {
      expect(expense).toHaveProperty("category");
      expect(expense).toHaveProperty("expenseType");
      expect(expense.category).toHaveProperty("name");
      expect(expense.expenseType).toHaveProperty("name");
    });
  });

  it("should get user expenses with search query", async () => {
    const expenses = await Expense.get("1", { search: "oreo" });

    expect(expenses).toBeDefined();
    expect(expenses).not.toBeNull();
    expect(expenses).not.toHaveLength(0);
    expect(expenses).toHaveLength(1);
  });

  it("should get user expenses with particular years", async () => {
    const expenses = await Expense.get("1", { years: 2022 });

    expect(expenses).toBeDefined();
    expect(expenses).not.toBeNull();
    expect(expenses).toHaveLength(2);
  });

  it("should get user expenses with particular month", async () => {
    const expenses = await Expense.get("1", { month: "Januari" });

    expect(expenses).toBeDefined();
    expect(expenses).not.toBeNull();
    expect(expenses).toHaveLength(4);
  });

  it("should get user expenses with particular month and years", async () => {
    const expenses = await Expense.get("1", { month: "Januari", years: 2022 });
    const expenses2 = await Expense.get("1", { month: "Januari", years: 2023 });

    expect(expenses).toBeDefined();
    expect(expenses).not.toBeNull();
    expect(expenses).toHaveLength(2);

    expect(expenses2).toBeDefined();
    expect(expenses2).not.toBeNull();
    expect(expenses2).toHaveLength(0);
  });

  it("should get user expenses with particular categories", async () => {
    const expenses = await Expense.get("1", { categories: ["1", "2"] });

    expect(expenses).toBeDefined();
    expect(expenses).not.toBeNull();
    expect(expenses).toHaveLength(8);
  });

  it("should get user expenses with particular expense types", async () => {
    const expenses = await Expense.get("1", { expenseTypes: ["2"] });
    const expenses2 = await Expense.get("1", { expenseTypes: ["3"] });

    expect(expenses).toBeDefined();
    expect(expenses).not.toBeNull();
    expect(expenses).toHaveLength(2);

    expect(expenses2).toBeDefined();
    expect(expenses2).not.toBeNull();
    expect(expenses2).toHaveLength(0);
  });

  it("should get user expenses with particular expense types and categories", async () => {
    const expenses = await Expense.get("1", {
      expenseTypes: ["2"],
      categories: ["1"],
    });

    expect(expenses).toBeDefined();
    expect(expenses).not.toBeNull();
    expect(expenses).toHaveLength(2);
  });

  it("should get user expenses with all filters", async () => {
    const expenses = await Expense.get("1", {
      search: "siomay",
      years: 2022,
      month: "Januari",
      categories: ["1"],
      expenseTypes: ["2"],
    });

    expect(expenses).toBeDefined();
    expect(expenses).not.toBeNull();
    expect(expenses).not.toHaveLength(0);
    expect(expenses).toHaveLength(1);
  });
});
