import { describe, it, expect } from "@jest/globals";
import { Cryptographer } from "../../utils";
import { JsonWebTokenError } from "jsonwebtoken";
import { logger } from "../../configs";

describe("Cryptographic", () => {
  const secret = "sst";
  const token = Cryptographer.createToken({ userid: "1" }, secret);
  it("should generate a token", () => {
    expect(Cryptographer.createToken({ userid: "1" }, secret)).not.toBeNull();
    expect(
      Cryptographer.createToken({ userid: "1" }, secret)
    ).not.toBeUndefined();
    expect(Cryptographer.createToken({ userid: "1" }, secret)).toBeDefined();
  });

  it("should decode a token", async () => {
    const decodedToken = await Cryptographer.decodeToken(token, secret);

    expect(decodedToken).toHaveProperty("userid");
    expect(decodedToken).not.toBeNull();
    expect(decodedToken).toBeDefined();
  });

  it("should throw error", async () => {
    try {
      await Cryptographer.decodeToken(token, "salah");
    } catch (error) {
      expect(error).toHaveProperty("message");
      expect(error).toBeInstanceOf(JsonWebTokenError);
      expect(error).toEqual({
        name: "JsonWebTokenError",
        message: "invalid signature",
      });
    }
  });

  it("should generate hashed string", async () => {
    const plainText = "test";
    const hashed = await Cryptographer.hash(plainText);

    expect(hashed).toBeDefined();
    expect(hashed).not.toBeNull();
  });

  it("should return true", async () => {
    const plainText = "test";
    const hashed = await Cryptographer.hash(plainText);

    const result = await Cryptographer.compare(plainText, hashed);

    expect(result).toBeDefined();
    expect(result).not.toBeNull();
    expect(result).toBeTruthy();
  });

  it("should throw an error", async () => {
    const plainText = "test";
    const hashed = await Cryptographer.hash(plainText);

    try {
      await Cryptographer.compare("testing", hashed);
    } catch (error) {
      expect(error).toBeDefined();
      expect(error).not.toBeNull();
      expect(error).toBeInstanceOf(Error);
    }
  });
});
