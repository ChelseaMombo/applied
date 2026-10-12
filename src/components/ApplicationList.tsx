import type { Application } from "../types";
import { ApplicationCard } from "./ApplicationCard";

type Props = {
  applications: Application[];
};

export function ApplicationList({ applications }: Props) {
  return (
    <section>
      {applications.map((application) => (
        <ApplicationCard key={application.id} application={application} />
      ))}
    </section>
  );
}