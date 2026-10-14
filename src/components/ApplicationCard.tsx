import { Link } from "react-router";
import type { Application } from "../types";
import { daysSince, needsNudge } from "../lib/applications";
import { StageBadge } from "./StageBadge";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Props = {
  application: Application;
};

export function ApplicationCard({ application }: Props) {
  const days = daysSince(application.dateSent);
  const nudge = needsNudge(application);

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <Link
            to={`/applications/${application.id}`}
            className="hover:underline"
          >
            {application.company}
          </Link>
        </CardTitle>
        <p className="text-sm text-muted-foreground">{application.role}</p>
      </CardHeader>
      <CardContent className="flex flex-col items-start gap-2">
        <StageBadge stage={application.stage} />
        <p className="text-sm">
          Sent {application.dateSent} · {days} days ago
        </p>
        {nudge && (
          <Badge className="bg-amber-200 text-amber-950 dark:bg-amber-500 dark:text-black">
            Needs a nudge
          </Badge>
        )}
      </CardContent>
    </Card>
  );
}