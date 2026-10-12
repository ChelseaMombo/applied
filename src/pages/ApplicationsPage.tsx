import { useState } from "react";
import { Link } from "react-router";
import { ApplicationList } from "../components/ApplicationList";
import { FilterBar } from "../components/FilterBar";
import { StageSummary } from "../components/StageSummary";
import { countByStage } from "../lib/applications";
import { useApplications } from "../hooks/useApplications";
import type { Stage } from "../types";

export function ApplicationsPage() {
  const { applications, loading, error, reload } = useApplications();
  const [search, setSearch] = useState("");
  const [stage, setStage] = useState<Stage | "all">("all");

  if (loading) {
    return <p>Loading…</p>;
  }

  if (error) {
    return (
      <section>
        <p role="alert">{error}</p>
        <button onClick={reload}>Try again</button>
      </section>
    );
  }

  if (applications.length === 0) {
    return (
      <section>
        <p>Nothing here yet.</p>
        <Link to="/new">Add your first application</Link>
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
        <section>
          <p>No jobs match your search.</p>
          <button onClick={clearFilters}>Clear filters</button>
        </section>
      ) : (
        <ApplicationList applications={filtered} />
      )}
    </>
  );
}