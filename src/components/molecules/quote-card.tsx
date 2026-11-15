import { Avatar } from "@/components/atoms/avatar";
import type { Testimonial } from "@/content/schemas";
import { fillTemplate, formatPackageLpa } from "@/lib/format";

export function QuoteCard({ testimonial, placedAtLabel }: { testimonial: Testimonial; placedAtLabel: string }) {
  return (
    <figure className="flex h-full flex-col justify-between gap-6 rounded-xl border border-line bg-background p-5 lg:p-7">
      <blockquote className="font-accent text-heading-lg leading-[1.4] font-normal italic text-ink">
        “{testimonial.quote}”
      </blockquote>
      <figcaption className="flex items-center gap-3">
        <Avatar name={testimonial.studentName} size="md" />
        <span className="grid min-w-0">
          <span className="font-bold text-ink">{testimonial.studentName}</span>
          <span className="text-body-sm text-muted">
            {fillTemplate(placedAtLabel, { company: testimonial.companyName })} ·{" "}
            {formatPackageLpa(testimonial.packageLpa)}
          </span>
        </span>
      </figcaption>
    </figure>
  );
}
