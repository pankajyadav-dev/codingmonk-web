import { AppLink } from "@/components/atoms/app-link";
import { BrandMark } from "@/components/atoms/brand-mark";
import { BrandWordmark } from "@/components/atoms/brand-wordmark";
import { ButtonLink } from "@/components/atoms/button";
import { ThemeSwitcher } from "@/components/molecules/theme-switcher";
import type { InternalLink } from "@/content/schemas";
import { HeaderNavigationLinks } from "./header-navigation-links";
import { MobileMenu } from "./mobile-menu";

type SiteHeaderProps = {
  siteName: string;
  wordmark: { lead: string; accent: string };
  navigationLinks: InternalLink[];
  callToAction: InternalLink;
  themeToggleLabel: string;
  menuLabels: { open: string; close: string; mainNavigation: string; mobileNavigation: string };
};

export function SiteHeader({
  siteName,
  wordmark,
  navigationLinks,
  callToAction,
  themeToggleLabel,
  menuLabels,
}: SiteHeaderProps) {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-line bg-background">
      <div className="flex min-h-[68px] items-center gap-6 px-gutter py-3 xl:gap-10">
        <AppLink href="/" aria-label={siteName} className="group flex shrink-0 items-center gap-2 text-ink">
          <BrandMark isAnimated />
          <BrandWordmark lead={wordmark.lead} accent={wordmark.accent} className="text-[1.25rem]" />
        </AppLink>
        <HeaderNavigationLinks links={navigationLinks} ariaLabel={menuLabels.mainNavigation} />
        <div className="ml-auto flex items-center gap-3">
          <ThemeSwitcher toggleLabel={themeToggleLabel} />
          <ButtonLink href={callToAction.href} size="sm" className="max-lg:hidden">
            {callToAction.label}
          </ButtonLink>
          <MobileMenu
            navigationLinks={navigationLinks}
            callToAction={callToAction}
            openLabel={menuLabels.open}
            closeLabel={menuLabels.close}
            navigationLabel={menuLabels.mobileNavigation}
          />
        </div>
      </div>
    </header>
  );
}
