import type { Stage } from "../types";
import { stageLabels } from "../lib/applications";

type Props = {
  search: string;
  onSearchChange: (value: string) => void;
  stage: Stage | "all";
  onStageChange: (value: Stage | "all") => void;
};

export function FilterBar({
  search,
  onSearchChange,
  stage,
  onStageChange,
}: Props) {
  const stages = Object.keys(stageLabels) as Stage[];

  return (
    <div>
      <label htmlFor="search">Search company or job title</label>
      <input
        id="search"
        type="search"
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
      />

      <label htmlFor="stage-filter">Stage</label>
      <select
        id="stage-filter"
        value={stage}
        onChange={(e) => onStageChange(e.target.value as Stage | "all")}
      >
        <option value="all">All stages</option>
        {stages.map((s) => (
          <option key={s} value={s}>
            {stageLabels[s]}
          </option>
        ))}
      </select>
    </div>
  );
}