import { describe, it, expect } from "@jest/globals";
import { User } from "../../database";
import { APIError } from "../../utils";
import { logger } from "../../configs";

describe("User repository", () => {
  it("should get a user data", async () => {
    const user = await User.getUserById("1");
    expect(user).toBeDefined();
    expect(user).not.toBe(null);
    expect(user).toHaveProperty("id");
    expect(user).toHaveProperty("first_name");
    expect(user).toHaveProperty("last_name");
    expect(user).toHaveProperty("profile_picture");
    expect(user).toHaveProperty("balance");
  });

  it("should get a user credentials", async () => {
    const user = await User.getUserCredentials("1");
    expect(user).toBeDefined();
    expect(user).not.toBe(null);
    expect(user).toHaveProperty("id");
    expect(user).toHaveProperty("email");
    expect(user).toHaveProperty("token");
    expect(user).toHaveProperty("password");
  });

  it("should save a user data", async () => {
    const user = await User.save({
      email: "test.@mail.com",
      first_name: "test",
      password: "2222",
    });

    expect(user).toBeDefined();
    expect(user).not.toBeNull();
    expect(user).toHaveProperty("id");

    expect(await User.getUserById(user.id)).toBeDefined();
    expect(await User.getUserById(user.id)).not.toBeNull();

    await User.deleteById(user.id);
  });

  it("should update profile picture value", async () => {
    const result = await User.updateProfilePicture("1", "profile.png");
    expect(result).toBeDefined();
    expect(result).not.toBeNull();
    expect(result.profile_picture).not.toBeNull();
    expect(result.profile_picture).toBe("profile.png");
  });

  it("should delete user data", async () => {
    const user = await User.save({
      email: "test.@mail.com",
      first_name: "test",
      password: "2222",
    });

    expect(user).toBeDefined();
    expect(user).not.toBeNull();

    const result = await User.deleteById(user.id);
    expect(result).toBeDefined();
    expect(result).not.toBeNull();
    expect(result).toBeTruthy();

    try {
      await User.getUserById(user.id);
    } catch (error) {
      expect(error).toBeInstanceOf(APIError);
      if (error instanceof APIError) {
        expect(error.message).toBe("user not found");
        expect(error.status).toBe(404);
      }
    }
  });

  it("should throw an API error", async () => {
    try {
      const user = await User.getUserById("2");
      logger.info(JSON.stringify(user));
    } catch (error) {
      expect(error).toBeDefined();
      expect(error).not.toBeNull();
      expect(error).toBeInstanceOf(APIError);
      expect(error).toHaveProperty("status");
      expect(error).toHaveProperty("message");

      if (error instanceof APIError) {
        expect(error.message).toBe("user not found");
        expect(error.status).toBe(404);
      }
    }
  });

  it("should throw an API error", async () => {
    try {
      const user = await User.getUserCredentials("2");
      logger.info(JSON.stringify(user));
    } catch (error) {
      expect(error).toBeDefined();
      expect(error).not.toBeNull();
      expect(error).toBeInstanceOf(APIError);
      expect(error).toHaveProperty("status");
      expect(error).toHaveProperty("message");

      if (error instanceof APIError) {
        expect(error.message).toBe("user not found");
        expect(error.status).toBe(404);
      }
    }
  });
});
