import { ProcessStepItem } from "@/components/molecules/process-step-item";
import type { ProcessStep } from "@/content/schemas";
import { fillTemplate } from "@/lib/format";

export function ProcessSteps({ steps, stepLabelTemplate }: { steps: ProcessStep[]; stepLabelTemplate: string }) {
  return (
    <ol className="grid gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-[repeat(auto-fit,minmax(220px,1fr))]">
      {steps.map((step, stepIndex) => (
        <ProcessStepItem
          key={step.title}
          step={step}
          stepLabel={fillTemplate(stepLabelTemplate, { number: stepIndex + 1 })}
        />
      ))}
    </ol>
  );
}
