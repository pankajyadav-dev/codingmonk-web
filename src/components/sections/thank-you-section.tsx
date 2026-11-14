import { Suspense } from "react";
import { ButtonLink } from "@/components/atoms/button";
import { Eyebrow } from "@/components/atoms/eyebrow";
import { Heading } from "@/components/atoms/heading";
import { Text } from "@/components/atoms/text";
import { PageSection } from "@/components/organisms/page-section";
import { ThankYouReference } from "@/components/organisms/thank-you-reference";
import { siteContent, thankYouCopy } from "@/content";

export function ThankYouSection() {
  return (
    <PageSection>
      <div className="grid justify-items-start gap-5">
        <Eyebrow>{thankYouCopy.eyebrow}</Eyebrow>
        <Heading as="h1" size="display-lg" markedText={thankYouCopy.heading} className="max-w-[20ch]" />
        <Text size="lg" measure="readable">
          {thankYouCopy.description}
        </Text>
        <Suspense>
          <ThankYouReference
            whatsappNumber={siteContent.contact.whatsappNumber}
            greeting={siteContent.whatsappGreeting}
            referenceLabel={thankYouCopy.referenceLabel}
            openWhatsappLabel={thankYouCopy.openWhatsappLabel}
          />
        </Suspense>
        <div className="flex flex-wrap gap-3">
          <ButtonLink href="/programs" variant="secondary">
            {thankYouCopy.browseProgramsLabel}
          </ButtonLink>
          <ButtonLink href="/courses" variant="secondary">
            {thankYouCopy.watchCoursesLabel}
          </ButtonLink>
        </div>
      </div>
    </PageSection>
  );
}
