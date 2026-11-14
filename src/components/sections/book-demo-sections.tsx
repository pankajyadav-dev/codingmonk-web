import { Suspense } from "react";
import { Avatar } from "@/components/atoms/avatar";
import { ButtonLink } from "@/components/atoms/button";
import { Eyebrow } from "@/components/atoms/eyebrow";
import { WhatsappIcon } from "@/components/atoms/whatsapp-icon";
import { ContactMethodCard } from "@/components/molecules/contact-method-card";
import { FounderStrip } from "@/components/molecules/founder-strip";
import { DemoRequestForm } from "@/components/organisms/demo-request-form";
import { PageHeader } from "@/components/organisms/page-header";
import { PageSection } from "@/components/organisms/page-section";
import { bookDemoCopy, foundersContent, programsContent, sharedUiCopy, siteContent } from "@/content";
import type { DemoRequestAction } from "@/lib/demo-request";
import { buildWhatsappUrl } from "@/lib/whatsapp";

export function BookDemoSections({ submitAction }: { submitAction: DemoRequestAction }) {
  const copy = bookDemoCopy;
  const whatsappUrl = buildWhatsappUrl(siteContent.contact.whatsappNumber, siteContent.whatsappGreeting);
  return (
    <>
      <PageHeader
        breadcrumbs={[{ label: sharedUiCopy.breadcrumbHomeLabel, href: "/" }, { label: copy.hero.eyebrow }]}
        breadcrumbAriaLabel={sharedUiCopy.breadcrumbAriaLabel}
        eyebrow={copy.hero.eyebrow}
        heading={copy.hero.heading}
        description={copy.hero.description}
      >
        <FounderStrip
          founders={foundersContent}
          title={copy.hero.founderStrip.title}
          description={copy.hero.founderStrip.description}
        />
      </PageHeader>
      <PageSection id="demo-form" className="pt-10 lg:pt-12">
        <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1.35fr)_minmax(300px,1fr)] lg:gap-14">
          <Suspense>
            <DemoRequestForm
              submitAction={submitAction}
              formCopy={copy.form}
              programOptions={programsContent.map((program) => ({ slug: program.slug, title: program.title }))}
              sourcePath="/book-demo"
            />
          </Suspense>
          <aside className="grid gap-3">
            <div className="grid gap-4 rounded-xl border-[1.5px] border-brand bg-brand-glow p-5">
              <Eyebrow>{copy.founderCard.eyebrow}</Eyebrow>
              <h2 className="font-display text-heading-md font-bold">{copy.founderCard.heading}</h2>
              <ul className="grid gap-3">
                {foundersContent.map((founder) => (
                  <li key={founder.id} className="flex items-center gap-3">
                    <Avatar
                      name={founder.name}
                      photoSrc={founder.photo.src}
                      size="lg"
                      className="border-[3px] border-brand"
                    />
                    <span className="grid">
                      <span className="font-display text-body font-bold">{founder.name}</span>
                      <span className="text-body-sm text-muted">{founder.role}</span>
                    </span>
                  </li>
                ))}
              </ul>
              <p className="text-body-sm text-muted">{copy.founderCard.description}</p>
            </div>
            <ContactMethodCard
              title={copy.contactMethods.whatsappTitle}
              value={siteContent.contact.phoneDisplay}
              description={copy.contactMethods.whatsappDescription}
            >
              <ButtonLink href={whatsappUrl} variant="whatsapp" size="sm">
                <WhatsappIcon size={18} />
                {copy.contactMethods.whatsappButtonLabel}
              </ButtonLink>
            </ContactMethodCard>
            <ContactMethodCard
              title={copy.contactMethods.emailTitle}
              value={siteContent.contact.email}
              description={copy.contactMethods.emailDescription}
            />
            <ContactMethodCard
              title={copy.contactMethods.phoneTitle}
              value={siteContent.contact.phoneDisplay}
              description={siteContent.contact.officeHours}
            />
          </aside>
        </div>
      </PageSection>
    </>
  );
}
