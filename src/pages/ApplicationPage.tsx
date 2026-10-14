import { useState } from "react";
import { Link } from "react-router";
import { ApplicationList } from "../components/ApplicationList";
import { FilterBar } from "../components/FilterBar";
import { StageSummary } from "../components/StageSummary";
import { countByStage } from "../lib/applications";
import { useApplications } from "../hooks/useApplications";
import type { Stage } from "../types";
import { Button } from "@/components/ui/button";

export function ApplicationsPage() {
  const { applications, loading, error, reload } = useApplications();
  const [search, setSearch] = useState("");
  const [stage, setStage] = useState<Stage | "all">("all");

  if (loading) {
    return <p className="py-8 text-center">Loading…</p>;
  }

  if (error) {
    return (
      <section className="flex flex-col items-center gap-4 py-8">
        <p role="alert">{error}</p>
        <Button onClick={reload}>Try again</Button>
      </section>
    );
  }

  if (applications.length === 0) {
    return (
      <section className="flex flex-col items-center gap-4 py-8">
        <p>Nothing here yet.</p>
        <Button asChild>
          <Link to="/new">Add your first application</Link>
        </Button>
      </section>
    );
  }

  const counts = countByStage(applications);

  const query = search.trim().toLowerCase();
  const filtered = applications.filter((application) => {
    const matchesSearch =
      application.company.toLowerCase().includes(query) ||
      application.role.toLowerCase().includes(query);
    const matchesStage = stage === "all" || application.stage === stage;
    return matchesSearch && matchesStage;
  });

  function clearFilters() {
    setSearch("");
    setStage("all");
  }

  return (
    <>
      <StageSummary counts={counts} />
      <FilterBar
        search={search}
        onSearchChange={setSearch}
        stage={stage}
        onStageChange={setStage}
      />
      {filtered.length === 0 ? (
        <section className="flex flex-col items-center gap-4 py-8">
          <p>No jobs match your search.</p>
          <Button variant="outline" onClick={clearFilters}>
            Clear filters
          </Button>
        </section>
      ) : (
        <ApplicationList applications={filtered} />
      )}
    </>
  );
}