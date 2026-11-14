import { SectionHeader } from "@/components/molecules/section-header";
import { TitledItemCard } from "@/components/molecules/titled-item-card";
import { CardGrid } from "@/components/organisms/card-grid";
import { PageSection, type SectionTone } from "@/components/organisms/page-section";
import type { TitledItem } from "@/content/schemas";

type TitledItemsSectionProps = {
  eyebrow: string;
  heading: string;
  description?: string;
  items: TitledItem[];
  tone: SectionTone;
  headingId: string;
};

export function TitledItemsSection({ eyebrow, heading, description, items, tone, headingId }: TitledItemsSectionProps) {
  if (items.length === 0) return null;
  return (
    <PageSection tone={tone} labelledBy={headingId}>
      <SectionHeader eyebrow={eyebrow} heading={heading} description={description} headingId={headingId} />
      <CardGrid minimumCardSize="sm" className="gap-x-6 gap-y-8 lg:gap-x-8">
        {items.map((item) => (
          <li key={item.title}>
            <TitledItemCard item={item} />
          </li>
        ))}
      </CardGrid>
    </PageSection>
  );
}
