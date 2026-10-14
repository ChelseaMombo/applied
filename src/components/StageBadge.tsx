import type { Stage } from "../types";
import { stageLabels } from "../lib/applications";
import { Badge } from "@/components/ui/badge";

const colours: Record<Stage, string> = {
  wishlist: "bg-slate-200 text-slate-900 dark:bg-slate-700 dark:text-slate-100",
  applied: "bg-blue-100 text-blue-900 dark:bg-blue-900 dark:text-blue-100",
  interview:
    "bg-purple-100 text-purple-900 dark:bg-purple-900 dark:text-purple-100",
  offer: "bg-green-100 text-green-900 dark:bg-green-900 dark:text-green-100",
  closed: "bg-red-100 text-red-900 dark:bg-red-900 dark:text-red-100",
};

type Props = {
  stage: Stage;
};

export function StageBadge({ stage }: Props) {
  return (
    <Badge data-stage={stage} className={colours[stage]}>
      {stageLabels[stage]}
    </Badge>
  );
}