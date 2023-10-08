import { describe, it, expect } from "@jest/globals";
import { ExpenseType } from "../database";
import { APIError } from "../utils";

describe("Exepense type respository", () => {
  it("should create an expense type", async () => {
    const expenseType = await ExpenseType.create({
      user_id: "1",
      name: "test",
      description: "expense type for testing",
    });

    const expenseTypes = await ExpenseType.get("1", { search: "test" });

    expect(expenseType).toBeDefined();
    expect(expenseType).not.toBeNull();
    expect(expenseTypes).not.toHaveLength(0);
    expect(expenseTypes).toHaveLength(1);

    await ExpenseType.delete(expenseType.id);
  });

  it("should get users expense types", async () => {
    const expenseTypes = await ExpenseType.get("1");

    expect(expenseTypes).toBeDefined();
    expect(expenseTypes).not.toBeNull();
    expect(expenseTypes).not.toHaveLength(0);
    expect(expenseTypes.length).toBeLessThanOrEqual(10);
  });

  it("should get users with particular search query", async () => {
    const expenseTypes = await ExpenseType.get("1", { search: "needs" });
    const expenseTypes2 = await ExpenseType.get("1", { search: "nothing" });

    expect(expenseTypes).toBeDefined();
    expect(expenseTypes).not.toBeNull();
    expect(expenseTypes).not.toHaveLength(0);
    expect(expenseTypes).toHaveLength(1);

    expect(expenseTypes2).toBeDefined();
    expect(expenseTypes2).not.toBeNull();
    expect(expenseTypes2).toHaveLength(0);
  });

  it("should update expense type data", async () => {
    const expenseTypes = await ExpenseType.get("1", { search: "need" });
    const result = await ExpenseType.update(expenseTypes[0].id, {
      name: "kebutuhan",
      description: "type for kebutuhan",
      user_id: "1",
    });

    const updatedExpenseType = await ExpenseType.get("1", {
      search: "kebutuhan",
    });

    expect(result).toBeDefined();
    expect(result).not.toBeNull();
    expect(updatedExpenseType[0]).toBeDefined();
    expect(updatedExpenseType[0]).not.toBeNull();
    expect(updatedExpenseType[0]).toHaveProperty("name");
    expect(updatedExpenseType[0]).toHaveProperty("description");
    expect(updatedExpenseType[0].name).toBe("kebutuhan");
    expect(updatedExpenseType[0].description).toBe("type for kebutuhan");
    await ExpenseType.update(expenseTypes[0].id, {
      name: "Needs",
      description: "type for kebutuhan",
      user_id: "1",
    });
  });

  it("should throw an error when user not found", async () => {
    try {
      await ExpenseType.get("3");
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
