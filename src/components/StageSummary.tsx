import type { Stage } from "../types";
import { stageLabels } from "../lib/applications";

type Props = {
  counts: Record<Stage, number>;
};

export function StageSummary({ counts }: Props) {
  const stages = Object.keys(stageLabels) as Stage[];

  return (
    <ul className="mb-4 grid grid-cols-2 gap-2 sm:grid-cols-5">
      {stages.map((stage) => (
        <li key={stage} className="rounded-lg border p-3 text-center">
          <span className="block text-2xl font-bold">{counts[stage]}</span>
          <span className="text-sm text-muted-foreground">
            {stageLabels[stage]}
          </span>
        </li>
      ))}
    </ul>
  );
}