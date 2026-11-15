import type { Metadata, Viewport } from "next";
import { Instrument_Serif, Noto_Sans, Sora } from "next/font/google";
import { AnnouncementBar } from "@/components/organisms/announcement-bar";
import { SiteFooter } from "@/components/organisms/site-footer";
import { SiteHeader } from "@/components/organisms/site-header";
import { SkipLink } from "@/components/organisms/skip-link";
import { StructuredData } from "@/components/organisms/structured-data";
import { ThemeProvider } from "@/components/organisms/theme-provider";
import { WhatsappFloatingButton } from "@/components/organisms/whatsapp-floating-button";
import { foundersContent, navigationContent, sharedUiCopy, siteContent } from "@/content";
import { getActiveAnnouncement, getCurrentYear } from "@/lib/request-time-values";
import { getSiteUrl, isSearchIndexingAllowed } from "@/lib/site-url";
import { buildOrganizationJsonLd, buildWebsiteJsonLd } from "@/lib/structured-data";
import { darkThemeTokens, lightThemeTokens } from "@/lib/theme-tokens";
import { buildWhatsappUrl } from "@/lib/whatsapp";
import "./globals.css";

const soraDisplayFont = Sora({ subsets: ["latin"], variable: "--font-sora", display: "swap" });
const instrumentSerifAccentFont = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: "italic",
  variable: "--font-instrument-serif",
  display: "swap",
});
const notoSansBodyFont = Noto_Sans({ subsets: ["latin"], variable: "--font-noto-sans", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: { default: siteContent.name, template: `%s | ${siteContent.name}` },
  description: siteContent.description,
  applicationName: siteContent.name,
  icons: {
    icon: [
      { url: "/brand-icon.svg", type: "image/svg+xml" },
      { url: "/icon/favicon", sizes: "32x32", type: "image/png" },
    ],
  },
  ...(isSearchIndexingAllowed() ? {} : { robots: { index: false, follow: false } }),
  formatDetection: { telephone: false, email: false, address: false },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: lightThemeTokens.background },
    { media: "(prefers-color-scheme: dark)", color: darkThemeTokens.background },
  ],
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const activeAnnouncement = await getActiveAnnouncement();
  const currentYear = await getCurrentYear();
  const copyrightYears =
    currentYear > siteContent.copyrightStartYear
      ? `${siteContent.copyrightStartYear}–${currentYear}`
      : `${currentYear}`;
  return (
    <html
      lang={siteContent.language}
      suppressHydrationWarning
      data-scroll-behavior="smooth"
      className={`${soraDisplayFont.variable} ${instrumentSerifAccentFont.variable} ${notoSansBodyFont.variable}`}
    >
      <body className="flex min-h-dvh flex-col">
        <ThemeProvider>
          <SkipLink label={sharedUiCopy.skipToContentLabel} />
          {activeAnnouncement ? (
            <AnnouncementBar announcement={activeAnnouncement} dismissLabel={sharedUiCopy.dismissAnnouncementLabel} />
          ) : null}
          <SiteHeader
            siteName={siteContent.name}
            wordmark={siteContent.wordmark}
            navigationLinks={navigationContent.headerLinks}
            callToAction={navigationContent.headerCta}
            themeToggleLabel={sharedUiCopy.themeToggleLabel}
            menuLabels={{
              open: sharedUiCopy.openMenuLabel,
              close: sharedUiCopy.closeMenuLabel,
              mainNavigation: sharedUiCopy.mainNavigationLabel,
              mobileNavigation: sharedUiCopy.mobileNavigationLabel,
            }}
          />
          <main id="main-content" tabIndex={-1} className="flex-1 focus:outline-none">
            {children}
          </main>
          <SiteFooter
            siteName={siteContent.name}
            wordmark={siteContent.wordmark}
            tagline={sharedUiCopy.footerTagline}
            footerGroups={navigationContent.footerGroups}
            callToAction={navigationContent.headerCta}
            youtubeChannel={siteContent.youtubeChannel}
            socialLinks={siteContent.socialLinks}
            contactHeading={sharedUiCopy.footerContactHeading}
            contactLines={[
              siteContent.contact.email,
              siteContent.contact.phoneDisplay,
              siteContent.contact.officeHours,
            ]}
            copyrightText={`© ${copyrightYears} ${siteContent.legalName}. ${sharedUiCopy.copyrightLabel}`}
          />
          <WhatsappFloatingButton
            whatsappUrl={buildWhatsappUrl(siteContent.contact.whatsappNumber, siteContent.whatsappGreeting)}
            label={sharedUiCopy.whatsappButtonLabel}
          />
        </ThemeProvider>
        <StructuredData data={buildOrganizationJsonLd(siteContent, foundersContent)} />
        <StructuredData data={buildWebsiteJsonLd(siteContent)} />
      </body>
    </html>
  );
}
