import { Avatar } from "@/components/atoms/avatar";
import type { Quote } from "@/content/schemas";

export function QuoteCard({ quote }: { quote: Quote }) {
  return (
    <figure className="flex h-full flex-col justify-between gap-6 rounded-xl border border-line bg-background p-5 lg:p-7">
      <blockquote className="font-accent text-heading-lg leading-[1.4] font-normal italic text-ink">
        “{quote.quote}”
      </blockquote>
      <figcaption className="flex items-center gap-3">
        <Avatar name={quote.personName} size="md" />
        <span className="grid min-w-0">
          <span className="font-bold text-ink">{quote.personName}</span>
          <span className="text-body-sm text-muted">
            {quote.designation}, {quote.collegeName}
          </span>
        </span>
      </figcaption>
    </figure>
  );
}
