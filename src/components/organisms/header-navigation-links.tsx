"use client";

import { usePathname } from "next/navigation";
import { AppLink } from "@/components/atoms/app-link";
import type { InternalLink } from "@/content/schemas";
import { cn } from "@/lib/class-names";

export function isActivePath(currentPath: string, linkPath: string) {
  return currentPath === linkPath || currentPath.startsWith(`${linkPath}/`);
}

export function HeaderNavigationLinks({ links, ariaLabel }: { links: InternalLink[]; ariaLabel: string }) {
  const currentPath = usePathname();
  return (
    <nav aria-label={ariaLabel} className="max-lg:hidden">
      <ul className="flex items-center gap-6 xl:gap-8">
        {links.map((link) => {
          const isActive = isActivePath(currentPath, link.href);
          return (
            <li key={link.href}>
              <AppLink
                href={link.href}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "border-b-2 py-1.5 text-body-sm font-semibold transition-colors hover:text-brand-strong",
                  isActive ? "border-brand text-ink" : "border-transparent text-ink",
                )}
              >
                {link.label}
              </AppLink>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
