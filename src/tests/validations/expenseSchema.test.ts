import { describe, expect, it } from "@jest/globals";
import { IExpense } from "../../types";
import { expenseSchema, validate } from "../../validations";
import { APIError } from "../../utils";

describe("Expense body data schema validation", () => {
  it("should throw date format validation error", () => {
    try {
      const data: IExpense = {
        date: "sep",
        category_id: "1",
        expense_type_id: "1",
        information: "tes",
        nominal: 2000,
      };
      validate(data, expenseSchema);
    } catch (error) {
      expect(error).toBeDefined();
      expect(error).not.toBeNull();
      expect(error).toBeInstanceOf(APIError);
      expect(error).toHaveProperty("status");
      expect(error).toHaveProperty("message");
      if (error instanceof APIError) {
        expect(error.message).toBe("Date should be a valid date format");
        expect(error.status).toBe(400);
      }
    }
  });

  it("should throw date required error", () => {
    try {
      const data = {
        information: "tes",
        nominal: 2000,
      };
      validate(data, expenseSchema);
    } catch (error) {
      expect(error).toBeDefined();
      expect(error).not.toBeNull();
      expect(error).toBeInstanceOf(APIError);
      expect(error).toHaveProperty("status");
      expect(error).toHaveProperty("message");
      if (error instanceof APIError) {
        expect(error.message).toBe('"date" is required');
        expect(error.status).toBe(400);
      }
    }
  });

  it("should throw information empty error", () => {
    try {
      const data: IExpense = {
        date: "20 september 2023",
        category_id: "1",
        expense_type_id: "1",
        information: "",
        nominal: 2000,
      };
      validate(data, expenseSchema);
    } catch (error) {
      expect(error).toBeDefined();
      expect(error).not.toBeNull();
      expect(error).toBeInstanceOf(APIError);
      expect(error).toHaveProperty("status");
      expect(error).toHaveProperty("message");
      if (error instanceof APIError) {
        expect(error.message).toBe("Expense information is required");
        expect(error.status).toBe(400);
      }
    }
  });

  it("should throw information required error", () => {
    try {
      const data = {
        date: "20 september 2023",
        category_id: "1",
        expense_type_id: "1",
        nominal: 2000,
      };
      validate(data, expenseSchema);
    } catch (error) {
      expect(error).toBeDefined();
      expect(error).not.toBeNull();
      expect(error).toBeInstanceOf(APIError);
      expect(error).toHaveProperty("status");
      expect(error).toHaveProperty("message");
      if (error instanceof APIError) {
        expect(error.message).toBe('"information" is required');
        expect(error.status).toBe(400);
      }
    }
  });

  it("should throw nominal validation error", () => {
    try {
      const data: IExpense = {
        date: "20 September 2023",
        information: "tes",
        category_id: "1",
        expense_type_id: "1",
        nominal: -2000,
      };
      validate(data, expenseSchema);
    } catch (error) {
      expect(error).toBeDefined();
      expect(error).not.toBeNull();
      expect(error).toBeInstanceOf(APIError);
      expect(error).toHaveProperty("status");
      expect(error).toHaveProperty("message");
      if (error instanceof APIError) {
        expect(error.message).toBe("Expense nominal cannot be a minus number");
        expect(error.status).toBe(400);
      }
    }
  });

  it("should throw nominal required error", () => {
    try {
      const data = {
        date: "20 September 2023",
        category_id: "1",
        expense_type_id: "1",
        information: "tes",
      };
      validate(data, expenseSchema);
    } catch (error) {
      expect(error).toBeDefined();
      expect(error).not.toBeNull();
      expect(error).toBeInstanceOf(APIError);
      expect(error).toHaveProperty("status");
      expect(error).toHaveProperty("message");
      if (error instanceof APIError) {
        expect(error.message).toBe('"nominal" is required');
        expect(error.status).toBe(400);
      }
    }
  });

  it("should throw category id required error", () => {
    try {
      const data = {
        date: "20 September 2023",
        expense_type_id: "1",
        information: "tes",
        nominal: 2000,
      };
      validate(data, expenseSchema);
    } catch (error) {
      expect(error).toBeDefined();
      expect(error).not.toBeNull();
      expect(error).toBeInstanceOf(APIError);
      expect(error).toHaveProperty("status");
      expect(error).toHaveProperty("message");
      if (error instanceof APIError) {
        expect(error.message).toBe('"category_id" is required');
        expect(error.status).toBe(400);
      }
    }
  });

  it("should throw category id empty error", () => {
    try {
      const data = {
        date: "20 September 2023",
        expense_type_id: "1",
        category_id: "",
        information: "tes",
        nominal: 2000,
      };
      validate(data, expenseSchema);
    } catch (error) {
      expect(error).toBeDefined();
      expect(error).not.toBeNull();
      expect(error).toBeInstanceOf(APIError);
      expect(error).toHaveProperty("status");
      expect(error).toHaveProperty("message");
      if (error instanceof APIError) {
        expect(error.message).toBe("Category id is required");
        expect(error.status).toBe(400);
      }
    }
  });

  it("should throw expense type id required error", () => {
    try {
      const data = {
        date: "20 September 2023",
        category_id: "1",
        information: "tes",
        nominal: 2000,
      };
      validate(data, expenseSchema);
    } catch (error) {
      expect(error).toBeDefined();
      expect(error).not.toBeNull();
      expect(error).toBeInstanceOf(APIError);
      expect(error).toHaveProperty("status");
      expect(error).toHaveProperty("message");
      if (error instanceof APIError) {
        expect(error.message).toBe('"expense_type_id" is required');
        expect(error.status).toBe(400);
      }
    }
  });

  it("should throw expense type id empty error", () => {
    try {
      const data = {
        date: "20 September 2023",
        expense_type_id: "",
        category_id: "1",
        information: "tes",
        nominal: 2000,
      };
      validate(data, expenseSchema);
    } catch (error) {
      expect(error).toBeDefined();
      expect(error).not.toBeNull();
      expect(error).toBeInstanceOf(APIError);
      expect(error).toHaveProperty("status");
      expect(error).toHaveProperty("message");
      if (error instanceof APIError) {
        expect(error.message).toBe("Expense type id is required");
        expect(error.status).toBe(400);
      }
    }
  });
});
