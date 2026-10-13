import { Link, Outlet } from "react-router";
import { Button } from "@/components/ui/button";

export function Layout() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b">
        <div className="mx-auto flex max-w-5xl items-center justify-between p-4">
          <Link to="/" className="text-xl font-bold">
            Applied
          </Link>
          <Button asChild variant="accent">
            <Link to="/new">Add application</Link>
          </Button>
        </div>
      </header>
      <main className="mx-auto max-w-5xl p-4">
        <Outlet />
      </main>
    </div>
  );
}