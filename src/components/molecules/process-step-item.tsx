import type { ProcessStep } from "@/content/schemas";

export function ProcessStepItem({ step, stepLabel }: { step: ProcessStep; stepLabel: string }) {
  return (
    <li className="flex h-full flex-col gap-2 border-t-[3px] border-brand pt-5">
      <p className="text-caption font-bold text-brand-strong">{stepLabel}</p>
      <h3 className="font-display text-heading-md font-bold">{step.title}</h3>
      <p className="text-body text-muted">{step.description}</p>
      <p className="mt-auto pt-1 text-caption font-semibold text-muted">{step.timingLabel}</p>
    </li>
  );
}
