import { toCountdown } from "./Countdown";

describe("wedding countdown", () => {
  test("counts down to midnight in the UK during British Summer Time", () => {
    expect(toCountdown({ from: "2027-08-15T22:30:00Z" })).toBe(
      "1 day · 0 hours · 30 minutes"
    );
  });
  test("celebrates on the wedding day without negative values", () => {
    expect(toCountdown({ from: "2027-08-16T23:00:00Z" })).toBe(
      "Today is the day!"
    );
    expect(toCountdown({ from: "2027-08-17T12:00:00Z" })).toBe(
      "Today is the day!"
    );
  });
  test("shows just married after the wedding day", () => {
    expect(toCountdown({ from: "2027-08-17T23:00:00Z" })).toBe("Just married!");
  });
  test("handles invalid dates", () => {
    expect(toCountdown({ until: "invalid" })).toBe("");
  });
});
