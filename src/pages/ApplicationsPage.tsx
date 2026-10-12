import { ApplicationList } from "../components/ApplicationList";
import { StageSummary } from "../components/StageSummary";
import { countByStage } from "../lib/applications";
import { seedApplications } from "../data/seed";

export function ApplicationsPage() {
  const counts = countByStage(seedApplications);

  return (
    <>
      <StageSummary counts={counts} />
      <ApplicationList applications={seedApplications} />
    </>
  );
}