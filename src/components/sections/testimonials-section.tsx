import { QuoteCard } from "@/components/molecules/quote-card";
import { SectionHeader } from "@/components/molecules/section-header";
import { CardGrid } from "@/components/organisms/card-grid";
import { PageSection, type SectionTone } from "@/components/organisms/page-section";
import { sharedUiCopy, testimonialsContent } from "@/content";
import type { SectionOf } from "@/content/schemas";

export function TestimonialsSection({
  section,
  tone,
  headingId,
}: {
  section: SectionOf<"testimonials">;
  tone: SectionTone;
  headingId: string;
}) {
  const testimonials = section.limit ? testimonialsContent.slice(0, section.limit) : testimonialsContent;
  if (testimonials.length === 0) return null;
  return (
    <PageSection tone={tone} labelledBy={headingId}>
      <SectionHeader
        eyebrow={section.eyebrow}
        heading={section.heading}
        description={section.description}
        headingId={headingId}
      />
      <CardGrid minimumCardSize="lg">
        {testimonials.map((testimonial) => (
          <li key={testimonial.studentName}>
            <QuoteCard testimonial={testimonial} placedAtLabel={sharedUiCopy.placedAtLabel} />
          </li>
        ))}
      </CardGrid>
    </PageSection>
  );
}
