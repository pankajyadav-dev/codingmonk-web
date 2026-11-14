import { QuoteCard } from "@/components/molecules/quote-card";
import { SectionHeader } from "@/components/molecules/section-header";
import { CardGrid } from "@/components/organisms/card-grid";
import { PageSection, type SectionTone } from "@/components/organisms/page-section";
import { StoryGrid } from "@/components/organisms/story-grid";
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
  const stories = section.showStudentStories ? testimonialsContent.studentStories : [];
  const quotes = section.showQuotes ? testimonialsContent.quotes : [];
  if (stories.length === 0 && quotes.length === 0) return null;
  return (
    <PageSection tone={tone} labelledBy={headingId}>
      <SectionHeader
        eyebrow={section.eyebrow}
        heading={section.heading}
        description={section.description}
        headingId={headingId}
      />
      <div className="grid gap-5 lg:gap-7">
        {stories.length > 0 ? (
          <StoryGrid
            stories={stories}
            playLabelTemplate={sharedUiCopy.playStoryLabel}
            comingSoonMessage={sharedUiCopy.storyComingSoon}
            closeLabel={sharedUiCopy.closeDialogLabel}
          />
        ) : null}
        {quotes.length > 0 ? (
          <CardGrid minimumCardSize="lg">
            {quotes.map((quote) => (
              <li key={quote.personName}>
                <QuoteCard quote={quote} />
              </li>
            ))}
          </CardGrid>
        ) : null}
      </div>
    </PageSection>
  );
}
