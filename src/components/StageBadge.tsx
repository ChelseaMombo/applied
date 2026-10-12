import type { Stage } from "../types";
import { stageLabels } from "../lib/applications";

type Props = {
  stage: Stage;
};

export function StageBadge({ stage }: Props) {
  return <span data-stage={stage}>{stageLabels[stage]}</span>;
}