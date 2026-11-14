import { Avatar } from "@/components/atoms/avatar";
import type { Trainer } from "@/content/schemas";

export function TrainerCard({ trainer }: { trainer: Trainer }) {
  return (
    <article className="flex h-full flex-col gap-3 rounded-lg border border-line bg-background p-5">
      <Avatar name={trainer.role} size="lg" />
      <div className="grid gap-0.5">
        <h3 className="font-display text-heading-sm font-bold">{trainer.name}</h3>
        <p className="text-body-sm font-semibold text-brand-strong">
          {trainer.role} · {trainer.experienceLabel}
        </p>
      </div>
      <p className="text-body-sm text-muted">{trainer.bio}</p>
    </article>
  );
}
