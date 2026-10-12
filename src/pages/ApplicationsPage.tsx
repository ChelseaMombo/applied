import { useState } from "react";
import { ApplicationList } from "../components/ApplicationList";
import { FilterBar } from "../components/FilterBar";
import { StageSummary } from "../components/StageSummary";
import { countByStage } from "../lib/applications";
import { seedApplications } from "../data/seed";
import type { Stage } from "../types";

export function ApplicationsPage() {
  const [search, setSearch] = useState("");
  const [stage, setStage] = useState<Stage | "all">("all");

  const counts = countByStage(seedApplications);

  const query = search.trim().toLowerCase();
  const filtered = seedApplications.filter((application) => {
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