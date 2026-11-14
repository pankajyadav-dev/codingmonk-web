import type { Route } from "next";
import Link from "next/link";
import type { ComponentProps } from "react";

export type AppLinkProps = Omit<ComponentProps<"a">, "href"> & { href: string };

export function isExternalHref(href: string) {
  return /^(https?:)?\/\//.test(href) || href.startsWith("mailto:") || href.startsWith("tel:");
}

export function AppLink({ href, children, ...anchorProps }: AppLinkProps) {
  if (isExternalHref(href)) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" {...anchorProps}>
        {children}
      </a>
    );
  }
  if (href.includes("#")) {
    // Native anchors scroll to the section again even when the URL already ends with the same #hash.
    return (
      <a href={href} {...anchorProps}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href as Route} {...anchorProps}>
      {children}
    </Link>
  );
}
