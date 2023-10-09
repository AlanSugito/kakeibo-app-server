import { describe, expect, it } from "@jest/globals";
import { IRegisterCredentials } from "../../types";
import { registerSchema, validate } from "../../validations";
import { APIError } from "../../utils";

describe("Auth data body schema validation", () => {
  it("should throw first name validation error", () => {
    const data: IRegisterCredentials = {
      first_name: "",
      last_name: "",
      email: "john@mail.com",
      password: "2020202020",
    };

    try {
      validate(data, registerSchema);
    } catch (error) {
      expect(error).toBeDefined();
      expect(error).not.toBeNull();
      expect(error).toBeInstanceOf(APIError);
      expect(error).toHaveProperty("status");
      expect(error).toHaveProperty("message");
      if (error instanceof APIError) {
        expect(error.status).toBe(400);
        expect(error.message).toBe("First name is required!");
      }
    }
  });

  it("should throw email validation error", () => {
    const data: IRegisterCredentials = {
      first_name: "john",
      last_name: "",
      email: "john",
      password: "2020202020",
    };

    try {
      validate(data, registerSchema);
    } catch (error) {
      expect(error).toBeDefined();
      expect(error).not.toBeNull();
      expect(error).toBeInstanceOf(APIError);
      expect(error).toHaveProperty("status");
      expect(error).toHaveProperty("message");
      if (error instanceof APIError) {
        expect(error.status).toBe(400);
        expect(error.message).toBe("Email must be a valid email format");
      }
    }
  });

  it("should throw email required error", () => {
    const data: IRegisterCredentials = {
      first_name: "john",
      last_name: "",
      email: "",
      password: "2020202020",
    };

    try {
      validate(data, registerSchema);
    } catch (error) {
      expect(error).toBeDefined();
      expect(error).not.toBeNull();
      expect(error).toBeInstanceOf(APIError);
      expect(error).toHaveProperty("status");
      expect(error).toHaveProperty("message");
      if (error instanceof APIError) {
        expect(error.status).toBe(400);
        expect(error.message).toBe("Email is required!");
      }
    }
  });

  it("should throw password required error", () => {
    const data: IRegisterCredentials = {
      first_name: "john",
      last_name: "",
      email: "john@mail.com",
      password: "",
    };

    try {
      validate(data, registerSchema);
    } catch (error) {
      expect(error).toBeDefined();
      expect(error).not.toBeNull();
      expect(error).toBeInstanceOf(APIError);
      expect(error).toHaveProperty("status");
      expect(error).toHaveProperty("message");
      if (error instanceof APIError) {
        expect(error.status).toBe(400);
        expect(error.message).toBe("Password is required!");
      }
    }
  });
  it("should throw password validation error", () => {
    const data: IRegisterCredentials = {
      first_name: "john",
      last_name: "",
      email: "john@mail.com",
      password: "23",
    };

    try {
      validate(data, registerSchema);
    } catch (error) {
      expect(error).toBeDefined();
      expect(error).not.toBeNull();
      expect(error).toBeInstanceOf(APIError);
      expect(error).toHaveProperty("status");
      expect(error).toHaveProperty("message");
      if (error instanceof APIError) {
        expect(error.status).toBe(400);
        expect(error.message).toBe(
          "Password must be at least 6 character or more"
        );
      }
    }
  });
});
