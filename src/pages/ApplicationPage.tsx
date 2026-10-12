import { Link, useParams } from "react-router";
import { seedApplications } from "../data/seed";

export function ApplicationPage() {
  const { id } = useParams();
  const application = seedApplications.find((a) => a.id === id);

  if (!application) {
    return (
      <section>
        <p>We could not find that application.</p>
        <Link to="/">Back to all applications</Link>
      </section>
    );
  }

  return (
    <section>
      <Link to="/">← Back to all applications</Link>
      <h2>{application.company}</h2>
      <p>{application.role}</p>
    </section>
  );
}