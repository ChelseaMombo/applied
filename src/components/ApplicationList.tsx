import type { Application } from "../types";
import { ApplicationCard } from "./ApplicationCard";

type Props = {
  applications: Application[];
};

export function ApplicationList({ applications }: Props) {
  return (
    <section className="grid grid-cols-1 gap-4 md:grid-cols-2">
      {applications.map((application) => (
        <ApplicationCard key={application.id} application={application} />
      ))}
    </section>
  );
}