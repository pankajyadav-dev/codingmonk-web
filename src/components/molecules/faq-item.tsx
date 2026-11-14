import { Plus } from "lucide-react";
import type { FaqItem as FaqItemContent } from "@/content/schemas";

export function FaqItem({ faqItem }: { faqItem: FaqItemContent }) {
  return (
    <details className="group border-b border-line">
      <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 py-4 font-display text-heading-sm font-bold [&::-webkit-details-marker]:hidden">
        {faqItem.question}
        <Plus
          aria-hidden="true"
          className="size-5 shrink-0 text-accent-text transition-transform duration-200 group-open:rotate-45"
        />
      </summary>
      <p className="max-w-[64ch] pb-5 text-body text-muted">{faqItem.answer}</p>
    </details>
  );
}
