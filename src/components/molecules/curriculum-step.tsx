import { Sparkles } from "lucide-react";

type CurriculumStepProps = {
  periodLabel: string;
  title: string;
  description: string;
  aiPractice: string;
  aiPracticeLabel: string;
};

export function CurriculumStep({ periodLabel, title, description, aiPractice, aiPracticeLabel }: CurriculumStepProps) {
  return (
    <li className="relative grid gap-1.5 pb-7 pl-7 before:absolute before:top-1.5 before:-left-[9px] before:size-4 before:rounded-full before:border-[3px] before:border-brand before:bg-background last:pb-0">
      <p className="text-caption font-bold text-brand-strong">{periodLabel}</p>
      <h3 className="font-display text-heading-md font-bold">{title}</h3>
      <p className="text-body text-muted">{description}</p>
      <p className="mt-1 flex items-start gap-2 rounded-md bg-surface px-3 py-2 text-body-sm text-ink">
        <Sparkles aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-accent-text" />
        <span>
          <span className="font-bold">{aiPracticeLabel}: </span>
          {aiPractice}
        </span>
      </p>
    </li>
  );
}
