import type { Application, Stage } from "../types";

const DAY = 1000 * 60 * 60 * 24;

export function daysSince(dateSent: string, today: Date = new Date()): number {
  const sent = new Date(dateSent);
  const gap = today.getTime() - sent.getTime();
  return Math.floor(gap / DAY);
}

export function needsNudge(
  application: Application,
  today: Date = new Date()
): boolean {
  if (application.stage !== "applied") return false;
  return daysSince(application.dateSent, today) > 14;
}
export const stageLabels: Record<Stage, string> = {
  wishlist: "Saved",
  applied: "Applied",
  interview: "Interview",
  offer: "Offer",
  closed: "Closed",
};

export function countByStage(
  applications: Application[]
): Record<Stage, number> {
  const counts: Record<Stage, number> = {
    wishlist: 0,
    applied: 0,
    interview: 0,
    offer: 0,
    closed: 0,
  };
  for (const application of applications) {
    counts[application.stage] += 1;
  }
  return counts;
}