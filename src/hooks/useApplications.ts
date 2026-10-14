import { useCallback, useEffect, useState } from "react";
import type { Application, NewApplication } from "../types";
import {
  fetchApplications,
  createApplication,
  updateApplication,
  deleteApplication,
} from "../api/applications";

const LOAD_ERROR = "Something went wrong loading your applications.";

export function useApplications() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const reload = useCallback(async () => {
    try {
      const data = await fetchApplications();
      setApplications(data);
      setError(null);
    } catch {
      setError(LOAD_ERROR);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let cancelled = false;

    fetchApplications()
      .then((data) => {
        if (cancelled) return;
        setApplications(data);
        setError(null);
      })
      .catch(() => {
        if (!cancelled) setError(LOAD_ERROR);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  async function add(input: NewApplication) {
    const created = await createApplication(input);
    await reload();
    return created;
  }

  async function update(id: string, changes: Partial<Application>) {
    const updated = await updateApplication(id, changes);
    await reload();
    return updated;
  }

  async function remove(id: string) {
    await deleteApplication(id);
    await reload();
  }

  return { applications, loading, error, add, update, remove, reload };
}