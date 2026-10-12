import { Link } from "react-router";

export function NotFoundPage() {
  return (
    <section>
      <h2>That page does not exist</h2>
      <p>You may have followed an old link, or mistyped the address.</p>
      <Link to="/">Back to all applications</Link>
    </section>
  );
}