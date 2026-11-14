"use client";

import { Menu, X } from "lucide-react";
import { Dialog } from "radix-ui";
import { useState } from "react";
import { AppLink } from "@/components/atoms/app-link";
import { ButtonLink } from "@/components/atoms/button";
import type { InternalLink } from "@/content/schemas";

type MobileMenuProps = {
  navigationLinks: InternalLink[];
  callToAction: InternalLink;
  openLabel: string;
  closeLabel: string;
  navigationLabel: string;
};

export function MobileMenu({ navigationLinks, callToAction, openLabel, closeLabel, navigationLabel }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const closeMenu = () => setIsOpen(false);
  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Trigger
        aria-label={openLabel}
        className="grid size-11 place-items-center rounded-md border border-line bg-surface lg:hidden"
      >
        <Menu aria-hidden="true" className="size-5" />
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-overlay" />
        <Dialog.Content className="fixed inset-y-0 right-0 z-50 flex w-[min(360px,88vw)] flex-col gap-1 overflow-y-auto bg-background p-6 shadow-raised focus:outline-none">
          <div className="mb-4 flex items-center justify-between">
            <Dialog.Title className="font-display text-heading-sm font-bold">{openLabel}</Dialog.Title>
            <Dialog.Close
              aria-label={closeLabel}
              className="grid size-11 place-items-center rounded-md border border-line"
            >
              <X aria-hidden="true" className="size-5" />
            </Dialog.Close>
          </div>
          <Dialog.Description className="sr-only">{openLabel}</Dialog.Description>
          <nav aria-label={navigationLabel}>
            <ul className="grid">
              {navigationLinks.map((link) => (
                <li key={link.href}>
                  <AppLink
                    href={link.href}
                    onClick={closeMenu}
                    className="block border-b border-line py-3.5 font-display text-heading-md font-bold"
                  >
                    {link.label}
                  </AppLink>
                </li>
              ))}
            </ul>
          </nav>
          <ButtonLink href={callToAction.href} onClick={closeMenu} className="mt-5">
            {callToAction.label}
          </ButtonLink>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
