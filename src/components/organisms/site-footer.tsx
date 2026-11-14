import { AppLink } from "@/components/atoms/app-link";
import { BrandMark } from "@/components/atoms/brand-mark";
import { BrandWordmark } from "@/components/atoms/brand-wordmark";
import { ButtonLink } from "@/components/atoms/button";
import type { InternalLink } from "@/content/schemas";

type FooterGroup = { title: string; links: InternalLink[] };

type SiteFooterProps = {
  siteName: string;
  wordmark: { lead: string; accent: string };
  tagline: string;
  footerGroups: FooterGroup[];
  callToAction: InternalLink;
  youtubeChannel: { name: string; url: string };
  contactHeading: string;
  contactLines: string[];
  copyrightText: string;
};

export function SiteFooter(footer: SiteFooterProps) {
  return (
    <footer className="w-full border-t border-transparent bg-panel px-gutter dark:border-line pt-16 pb-8 text-panel-ink lg:pt-20">
      <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[minmax(0,1.6fr)_repeat(4,minmax(0,1fr))]">
        <div className="grid content-start gap-4 md:col-span-2 lg:col-span-1">
          <AppLink href="/" aria-label={footer.siteName} className="flex w-fit items-center gap-2 text-panel-ink">
            <BrandMark size={34} />
            <BrandWordmark
              lead={footer.wordmark.lead}
              accent={footer.wordmark.accent}
              isOnPanel
              className="text-heading-sm"
            />
          </AppLink>
          <p className="max-w-[44ch] text-body-sm text-panel-muted">{footer.tagline}</p>
          <div className="flex flex-wrap gap-2.5">
            <ButtonLink href={footer.callToAction.href} size="sm">
              {footer.callToAction.label}
            </ButtonLink>
            <ButtonLink href={footer.youtubeChannel.url} size="sm" variant="onPanel">
              {footer.youtubeChannel.name}
            </ButtonLink>
          </div>
        </div>
        {footer.footerGroups.map((footerGroup) => (
          <nav key={footerGroup.title} aria-label={footerGroup.title} className="grid content-start gap-3">
            <p className="text-eyebrow font-bold tracking-[0.08em] text-panel-muted uppercase">{footerGroup.title}</p>
            <ul className="grid gap-2.5">
              {footerGroup.links.map((link) => (
                <li key={link.href}>
                  <AppLink href={link.href} className="text-body-sm hover:text-brand">
                    {link.label}
                  </AppLink>
                </li>
              ))}
            </ul>
          </nav>
        ))}
        <div className="grid content-start gap-3">
          <p className="text-eyebrow font-bold tracking-[0.08em] text-panel-muted uppercase">{footer.contactHeading}</p>
          <ul className="grid gap-2.5 text-body-sm">
            {footer.contactLines.map((contactLine) => (
              <li key={contactLine} className="select-all break-words">
                {contactLine}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <p className="mt-12 border-t border-panel-line pt-6 text-caption text-panel-muted">{footer.copyrightText}</p>
    </footer>
  );
}
