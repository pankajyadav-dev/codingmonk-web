"use client";

import errorCopy from "@content/pages/error.json";
import { MessagePageSection } from "@/components/sections/message-page-section";

export default function RouteError({ retry }: { error: unknown; retry: () => void }) {
  return (
    <MessagePageSection
      eyebrow={errorCopy.eyebrow}
      heading={errorCopy.heading}
      description={errorCopy.description}
      links={[{ label: errorCopy.homeLabel, href: "/" }]}
      retry={{ label: errorCopy.retryLabel, onRetry: retry }}
    />
  );
}
