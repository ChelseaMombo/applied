import type { Stage } from "../types";
import { stageLabels } from "../lib/applications";

type Props = {
  counts: Record<Stage, number>;
};

export function StageSummary({ counts }: Props) {
  const stages = Object.keys(stageLabels) as Stage[];

  return (
    <ul>
      {stages.map((stage) => (
        <li key={stage}>
          {stageLabels[stage]} {counts[stage]}
        </li>
      ))}
    </ul>
  );
}