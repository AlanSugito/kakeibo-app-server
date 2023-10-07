import { describe, expect, it } from "@jest/globals";
import Formatter from "../utils/Formatter";

describe("Formatter", () => {
  const dates = Formatter.splitDate(new Date("10/04/2023"));
  it("should return date into an object containing day, month, year", () => {
    expect(dates).toBeDefined();
    expect(dates).toHaveProperty("day");
    expect(dates).toHaveProperty("month");
    expect(dates).toHaveProperty("year");
    expect(dates).toEqual({ day: 4, month: "Oktober", year: 2023 });

    const datesFromString = Formatter.splitDate("03-10-2023");
    expect(datesFromString).toBeDefined();
    expect(datesFromString).not.toBeNull();
    expect(datesFromString).toHaveProperty("day");
    expect(datesFromString).toHaveProperty("month");
    expect(datesFromString).toHaveProperty("year");
    expect(datesFromString).toEqual({ day: 10, month: "Maret", year: 2023 });
  });

  const formattedDate = Formatter.formatDate(new Date("10/04/2023"));
  it("should format a date", () => {
    expect(formattedDate).toBeDefined();
    expect(formattedDate).not.toBeNull();
    expect(formattedDate).toBe("Rabu, 04 Oktober 2023");
  });
});
