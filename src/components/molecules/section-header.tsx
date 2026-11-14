import { ButtonLink } from "@/components/atoms/button";
import { Eyebrow } from "@/components/atoms/eyebrow";
import { Heading } from "@/components/atoms/heading";
import { Text } from "@/components/atoms/text";
import type { InternalLink } from "@/content/schemas";

type SectionHeaderProps = {
  eyebrow: string;
  heading: string;
  description?: string;
  action?: InternalLink;
  headingLevel?: "h1" | "h2";
  headingId?: string;
};

export function SectionHeader({
  eyebrow,
  heading,
  description,
  action,
  headingLevel = "h2",
  headingId,
}: SectionHeaderProps) {
  return (
    <header className="mb-8 flex flex-wrap items-end justify-between gap-x-10 gap-y-5 lg:mb-12">
      <div className="grid max-w-[860px] gap-3">
        <Eyebrow>{eyebrow}</Eyebrow>
        <Heading
          as={headingLevel}
          id={headingId}
          size={headingLevel === "h1" ? "display-lg" : "display-md"}
          markedText={heading}
        />
        {description ? (
          <Text size="lg" measure="readable">
            {description}
          </Text>
        ) : null}
      </div>
      {action ? (
        <ButtonLink href={action.href} variant="secondary">
          {action.label} →
        </ButtonLink>
      ) : null}
    </header>
  );
}
