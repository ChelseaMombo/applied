import type { Application } from "../types";

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