import { ApplicationList } from "../components/ApplicationList";
import { seedApplications } from "../data/seed";

export function ApplicationsPage() {
  return <ApplicationList applications={seedApplications} />;
}