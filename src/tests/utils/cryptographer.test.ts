import { describe, it, expect } from "@jest/globals";
import { Cryptographer } from "../../utils";
import { RT_SECRET } from "../../configs";

describe("Cryptographer", () => {
  const token = Cryptographer.createToken({ userid: "1" }, RT_SECRET);

  it("should decode a token", async () => {
    const decodedToken = await Cryptographer.decodeToken(token, RT_SECRET);
    console.log(decodedToken);

    expect(1).toBe(1);
  });
});
