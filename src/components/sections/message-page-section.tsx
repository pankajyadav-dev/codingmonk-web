import { Button, ButtonLink } from "@/components/atoms/button";
import { Eyebrow } from "@/components/atoms/eyebrow";
import { Heading } from "@/components/atoms/heading";
import { Text } from "@/components/atoms/text";
import type { InternalLink } from "@/content/schemas";

type MessagePageSectionProps = {
  eyebrow: string;
  heading: string;
  description: string;
  links: InternalLink[];
  retry?: { label: string; onRetry: () => void };
};

export function MessagePageSection({ eyebrow, heading, description, links, retry }: MessagePageSectionProps) {
  return (
    <section className="w-full px-gutter py-[clamp(80px,12vw,160px)]">
      <div className="grid justify-items-start gap-5">
        <Eyebrow>{eyebrow}</Eyebrow>
        <Heading as="h1" size="display-lg" markedText={heading} className="max-w-[18ch]" />
        <Text size="lg" measure="readable">
          {description}
        </Text>
        <div className="flex flex-wrap gap-3">
          {retry ? <Button onClick={retry.onRetry}>{retry.label}</Button> : null}
          {links.map((link, linkIndex) => (
            <ButtonLink key={link.href} href={link.href} variant={linkIndex === 0 && !retry ? "primary" : "secondary"}>
              {link.label}
            </ButtonLink>
          ))}
        </div>
      </div>
    </section>
  );
}
