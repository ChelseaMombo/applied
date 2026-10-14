import { describe, it, expect } from "vitest";
import { countByStage, daysSince, needsNudge } from "./applications";
import type { Application } from "../types";

const job: Application = {
  id: "1",
  company: "Vodacom",
  role: "Junior Developer",
  dateSent: "2026-10-01",
  stage: "applied",
  createdAt: "2026-10-01T09:00:00Z",
};

describe("daysSince", () => {
  it("counts whole days between the sent date and today", () => {
    expect(daysSince("2026-10-01", new Date("2026-10-11"))).toBe(10);
  });
});

describe("needsNudge", () => {
  it("is false at exactly fourteen days", () => {
    expect(needsNudge(job, new Date("2026-10-15"))).toBe(false);
  });

  it("is true at fifteen days", () => {
    expect(needsNudge(job, new Date("2026-10-16"))).toBe(true);
  });

  it("is false once there is an interview", () => {
    expect(
      needsNudge({ ...job, stage: "interview" }, new Date("2026-12-01"))
    ).toBe(false);
  });
});

describe("countByStage", () => {
  it("counts jobs at each stage and gives zero for empty stages", () => {
    const list: Application[] = [
      job,
      { ...job, id: "2" },
      { ...job, id: "3", stage: "offer" },
    ];
    expect(countByStage(list)).toEqual({
      wishlist: 0,
      applied: 2,
      interview: 0,
      offer: 1,
      closed: 0,
    });
  });

  it("gives all zeros for an empty list", () => {
    expect(countByStage([])).toEqual({
      wishlist: 0,
      applied: 0,
      interview: 0,
      offer: 0,
      closed: 0,
    });
  });
});