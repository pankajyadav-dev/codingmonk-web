import { ArrowUpRight } from "lucide-react";
import { AppLink } from "@/components/atoms/app-link";

type IndustrySignal = { source: string; finding: string; url: string };

export function IndustrySignalCard({ signal }: { signal: IndustrySignal }) {
  return (
    <AppLink
      href={signal.url}
      className="group flex h-full flex-col gap-2 rounded-lg border border-panel-line p-5 text-panel-ink transition-colors hover:border-brand"
    >
      <span className="flex items-center justify-between gap-3 text-caption font-bold text-brand">
        {signal.source}
        <ArrowUpRight aria-hidden="true" className="size-4" />
      </span>
      <span className="text-body">{signal.finding}</span>
    </AppLink>
  );
}
