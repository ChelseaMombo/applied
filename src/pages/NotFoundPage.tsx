import { Link } from "react-router";
import { Button } from "@/components/ui/button";

export function NotFoundPage() {
  return (
    <section className="flex flex-col items-center gap-4 py-12 text-center">
      <h2 className="text-2xl font-bold">That page does not exist</h2>
      <p className="text-muted-foreground">
        You may have followed an old link, or mistyped the address.
      </p>
      <Button asChild>
        <Link to="/">Back to all applications</Link>
      </Button>
    </section>
  );
}