import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { StageBadge } from "../components/StageBadge";
import { fieldClass } from "../components/fieldStyles";
import { daysSince, needsNudge, stageLabels } from "../lib/applications";
import { useApplications } from "../hooks/useApplications";
import type { Application, Stage } from "../types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

type DetailProps = {
  application: Application;
  update: (id: string, changes: Partial<Application>) => Promise<Application>;
  remove: (id: string) => Promise<void>;
};

function ApplicationDetail({ application, update, remove }: DetailProps) {
  const navigate = useNavigate();
  const [notes, setNotes] = useState(application.notes ?? "");
  const [saving, setSaving] = useState(false);
  const [confirming, setConfirming] = useState(false);
  const [writeError, setWriteError] = useState<string | null>(null);

  const days = daysSince(application.dateSent);
  const nudge = needsNudge(application);
  const stages = Object.keys(stageLabels) as Stage[];

  async function run(action: () => Promise<unknown>) {
    setSaving(true);
    setWriteError(null);
    try {
      await action();
    } catch {
      setWriteError("Something went wrong saving. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <section className="flex max-w-xl flex-col gap-4">
      <Link to="/" className="text-sm hover:underline">
        ← Back to all applications
      </Link>

      <div>
        <h2 className="text-2xl font-bold">{application.company}</h2>
        <p className="text-muted-foreground">{application.role}</p>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <StageBadge stage={application.stage} />
        {nudge && (
          <Badge className="bg-amber-200 text-amber-950 dark:bg-amber-500 dark:text-black">
            Needs a nudge
          </Badge>
        )}
      </div>

      <p className="text-sm">
        Sent {application.dateSent} · {days} days ago
        {application.link && (
          <>
            {" · "}
            <a
              href={application.link}
              target="_blank"
              rel="noreferrer"
              className="underline"
            >
              View the advert ↗
            </a>
          </>
        )}
      </p>

      {writeError && (
        <p role="alert" className="text-sm text-destructive">
          {writeError}
        </p>
      )}

      <div className="flex flex-col gap-2">
        <Label htmlFor="stage">Stage</Label>
        <select
          id="stage"
          className={fieldClass}
          value={application.stage}
          disabled={saving}
          onChange={(e) =>
            run(() =>
              update(application.id, { stage: e.target.value as Stage })
            )
          }
        >
          {stages.map((s) => (
            <option key={s} value={s}>
              {stageLabels[s]}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="notes">Notes</Label>
        <textarea
          id="notes"
          rows={5}
          className={fieldClass}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
        <Button
          className="self-start"
          disabled={saving}
          onClick={() => run(() => update(application.id, { notes }))}
        >
          {saving ? "Saving…" : "Save notes"}
        </Button>
      </div>

      {confirming ? (
        <div className="flex flex-col gap-2 rounded-lg border p-4">
          <p>Delete this application? This cannot be undone.</p>
          <div className="flex gap-2">
            <Button
              variant="destructive"
              disabled={saving}
              onClick={() =>
                run(async () => {
                  await remove(application.id);
                  navigate("/");
                })
              }
            >
              Yes, delete
            </Button>
            <Button
              variant="outline"
              disabled={saving}
              onClick={() => setConfirming(false)}
            >
              Cancel
            </Button>
          </div>
        </div>
      ) : (
        <Button
          variant="outline"
          className="self-start"
          disabled={saving}
          onClick={() => setConfirming(true)}
        >
          Delete this application
        </Button>
      )}
    </section>
  );
}

export function ApplicationPage() {
  const { id } = useParams();
  const { applications, loading, error, update, remove } = useApplications();

  if (loading) {
    return <p className="py-8 text-center">Loading…</p>;
  }

  if (error) {
    return (
      <p role="alert" className="py-8 text-center">
        {error}
      </p>
    );
  }

  const application = applications.find((a) => a.id === id);

  if (!application) {
    return (
      <section className="flex flex-col items-center gap-4 py-8">
        <p>We could not find that application.</p>
        <Button asChild>
          <Link to="/">Back to all applications</Link>
        </Button>
      </section>
    );
  }

  return (
    <ApplicationDetail
      application={application}
      update={update}
      remove={remove}
    />
  );
}