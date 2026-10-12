import type { Stage } from "../types";

const labels: Record<Stage, string> = {
  wishlist: "Saved",
  applied: "Applied",
  interview: "Interview",
  offer: "Offer",
  closed: "Closed",
};

type Props = {
  stage: Stage;
};

export function StageBadge({ stage }: Props) {
  return <span data-stage={stage}>{labels[stage]}</span>;
}