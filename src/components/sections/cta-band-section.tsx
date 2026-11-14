import { CtaBand } from "@/components/organisms/cta-band";
import type { CtaBandCopy } from "@/content/schemas";

export function CtaBandSection({ copy }: { copy: CtaBandCopy }) {
  return (
    <section aria-label={copy.eyebrow} className="w-full px-gutter pt-[clamp(32px,4vw,56px)] pb-section">
      <CtaBand copy={copy} />
    </section>
  );
}
