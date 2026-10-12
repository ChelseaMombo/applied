import type { Application } from "../types";
import { daysSince, needsNudge } from "../lib/applications";
import { StageBadge } from "./StageBadge";

type Props = {
  application: Application;
};

export function ApplicationCard({ application }: Props) {
  const days = daysSince(application.dateSent);
  const nudge = needsNudge(application);

  return (
    <article>
      <h3>{application.company}</h3>
      <p>{application.role}</p>
      <StageBadge stage={application.stage} />
      <p>
        Sent {application.dateSent} · {days} days ago
      </p>
      {nudge && <p>Needs a nudge</p>}
    </article>
  );
}