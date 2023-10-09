import { describe, expect, it } from "@jest/globals";
import { IIncome } from "../../types";
import { incomeSchema, validate } from "../../validations";
import { APIError } from "../../utils";

describe("Income data body schema validation", () => {
  it("should throw date format validation error", () => {
    try {
      const data: IIncome = {
        date: "sep",
        information: "tes",
        nominal: 2000,
      };
      validate(data, incomeSchema);
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
      validate(data, incomeSchema);
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
      const data: IIncome = {
        date: "20 september 2023",
        information: "",
        nominal: 2000,
      };
      validate(data, incomeSchema);
    } catch (error) {
      expect(error).toBeDefined();
      expect(error).not.toBeNull();
      expect(error).toBeInstanceOf(APIError);
      expect(error).toHaveProperty("status");
      expect(error).toHaveProperty("message");
      if (error instanceof APIError) {
        expect(error.message).toBe("Income information is required");
        expect(error.status).toBe(400);
      }
    }
  });

  it("should throw information required error", () => {
    try {
      const data = {
        date: "20 september 2023",
        nominal: 2000,
      };
      validate(data, incomeSchema);
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
      const data: IIncome = {
        date: "20 September 2023",
        information: "tes",
        nominal: -2000,
      };
      validate(data, incomeSchema);
    } catch (error) {
      expect(error).toBeDefined();
      expect(error).not.toBeNull();
      expect(error).toBeInstanceOf(APIError);
      expect(error).toHaveProperty("status");
      expect(error).toHaveProperty("message");
      if (error instanceof APIError) {
        expect(error.message).toBe("Nominal cannot be a minus number");
        expect(error.status).toBe(400);
      }
    }
  });

  it("should throw nominal required error", () => {
    try {
      const data = {
        date: "20 September 2023",
        information: "tes",
      };
      validate(data, incomeSchema);
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
});
