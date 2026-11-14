import { IndustrySignalCard } from "@/components/molecules/industry-signal-card";
import type { AiApproach } from "@/content/schemas";

export function AiApproachPanel({ aiApproach, signalsHeading }: { aiApproach: AiApproach; signalsHeading: string }) {
  return (
    <div className="grid gap-8 rounded-2xl bg-panel p-6 text-panel-ink lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] lg:gap-12 lg:p-10">
      <ol className="grid gap-x-8 gap-y-7 sm:grid-cols-2">
        {aiApproach.principles.map((principle, principleIndex) => (
          <li key={principle.title} className="grid content-start gap-2 border-t-[3px] border-brand pt-4">
            <span className="text-caption font-bold text-brand">{String(principleIndex + 1).padStart(2, "0")}</span>
            <h3 className="font-display text-heading-md font-bold">{principle.title}</h3>
            <p className="text-body text-panel-muted">{principle.description}</p>
          </li>
        ))}
      </ol>
      {aiApproach.industrySignals.length > 0 ? (
        <div className="grid content-start gap-3">
          <p className="text-eyebrow font-bold tracking-[0.12em] text-panel-muted uppercase">{signalsHeading}</p>
          <ul className="grid gap-3">
            {aiApproach.industrySignals.map((signal) => (
              <li key={signal.url}>
                <IndustrySignalCard signal={signal} />
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
