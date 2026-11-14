import { Eyebrow } from "@/components/atoms/eyebrow";
import { Heading } from "@/components/atoms/heading";
import { PageSection } from "@/components/organisms/page-section";
import { privacyCopy, siteContent } from "@/content";

export function PrivacySection() {
  return (
    <PageSection>
      <article className="grid max-w-[72ch] gap-8">
        <header className="grid gap-3">
          <Eyebrow>{privacyCopy.eyebrow}</Eyebrow>
          <Heading as="h1" size="display-lg" markedText={privacyCopy.heading} />
          <p className="text-body-sm text-muted">
            {privacyCopy.lastUpdatedLabel}: <time dateTime={privacyCopy.lastUpdated}>{privacyCopy.lastUpdated}</time>
          </p>
        </header>
        {privacyCopy.sections.map((privacySection) => (
          <section key={privacySection.heading} className="grid gap-3">
            <h2 className="font-display text-heading-md font-bold">{privacySection.heading}</h2>
            {privacySection.paragraphs.map((paragraph) => (
              <p key={paragraph} className="text-body text-muted">
                {paragraph}
              </p>
            ))}
          </section>
        ))}
        <p className="text-body font-semibold select-all">{siteContent.contact.email}</p>
      </article>
    </PageSection>
  );
}
