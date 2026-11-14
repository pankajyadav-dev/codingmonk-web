import { FaqItem } from "@/components/molecules/faq-item";
import { SectionHeader } from "@/components/molecules/section-header";
import { PageSection, type SectionTone } from "@/components/organisms/page-section";
import { StructuredData } from "@/components/organisms/structured-data";
import { getFaqItemsByIds } from "@/content";
import type { SectionOf } from "@/content/schemas";
import { buildFaqPageJsonLd } from "@/lib/structured-data";

export function FaqSection({
  section,
  tone,
  headingId,
}: {
  section: SectionOf<"faq">;
  tone: SectionTone;
  headingId: string;
}) {
  const faqItems = getFaqItemsByIds(section.faqIds);
  if (faqItems.length === 0) return null;
  return (
    <PageSection tone={tone} labelledBy={headingId}>
      <SectionHeader
        eyebrow={section.eyebrow}
        heading={section.heading}
        description={section.description}
        headingId={headingId}
      />
      <div className="grid gap-x-12 lg:grid-cols-2">
        {faqItems.map((faqItem) => (
          <FaqItem key={faqItem.id} faqItem={faqItem} />
        ))}
      </div>
      <StructuredData data={buildFaqPageJsonLd(faqItems)} />
    </PageSection>
  );
}
