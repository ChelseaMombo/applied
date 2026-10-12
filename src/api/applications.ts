import type { Application, NewApplication } from "../types";
import { seedApplications } from "../data/seed";

const STORAGE_KEY = "applied.applications";
const DELAY_MS = 300;

function wait(ms: number = DELAY_MS): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function writeAll(applications: Application[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(applications));
}

function readAll(): Application[] {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (raw === null) {
    writeAll(seedApplications);
    return seedApplications;
  }
  return JSON.parse(raw) as Application[];
}

export async function fetchApplications(): Promise<Application[]> {
  await wait();
  return [...readAll()].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export async function createApplication(
  input: NewApplication
): Promise<Application> {
  await wait();
  const created: Application = {
    ...input,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  };
  writeAll([...readAll(), created]);
  return created;
}

export async function updateApplication(
  id: string,
  changes: Partial<Application>
): Promise<Application> {
  await wait();
  const all = readAll();
  const existing = all.find((a) => a.id === id);
  if (!existing) {
    throw new Error("Application not found");
  }
  const updated: Application = { ...existing, ...changes };
  writeAll(all.map((a) => (a.id === id ? updated : a)));
  return updated;
}

export async function deleteApplication(id: string): Promise<void> {
  await wait();
  writeAll(readAll().filter((a) => a.id !== id));
}