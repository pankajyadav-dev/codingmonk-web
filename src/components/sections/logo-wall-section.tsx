import { LogoWall } from "@/components/organisms/logo-wall";
import { collegesContent, recruitersContent } from "@/content";
import type { SectionOf } from "@/content/schemas";

const organizationsBySource = { colleges: collegesContent, recruiters: recruitersContent };

export function LogoWallSection({ section }: { section: SectionOf<"logoWall"> }) {
  const logoGroups = section.groups.map((group) => ({
    label: group.label,
    organizationNames: organizationsBySource[group.source].map((organization) => organization.name),
  }));
  return (
    <section aria-label={section.eyebrow} className="w-full border-y border-line bg-surface px-gutter py-6">
      <LogoWall eyebrow={section.eyebrow} logoGroups={logoGroups} />
    </section>
  );
}
