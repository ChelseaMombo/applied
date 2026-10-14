import type { Stage } from "../types";
import { stageLabels } from "../lib/applications";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
    <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-end">
      <div className="flex flex-1 flex-col gap-2">
        <Label htmlFor="search">Search company or job title</Label>
        <Input
          id="search"
          type="search"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-2 sm:w-48">
        <Label htmlFor="stage-filter">Stage</Label>
        <Select
          value={stage}
          onValueChange={(value) => onStageChange(value as Stage | "all")}
        >
          <SelectTrigger id="stage-filter" className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All stages</SelectItem>
            {stages.map((s) => (
              <SelectItem key={s} value={s}>
                {stageLabels[s]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}