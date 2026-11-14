"use client";

import { X } from "lucide-react";
import { useSyncExternalStore } from "react";
import { AppLink } from "@/components/atoms/app-link";
import type { Announcement } from "@/content/schemas";

const dismissedStorageKey = "codingmonk.dismissed-announcement";
const dismissEventName = "codingmonk:announcement-dismissed";

function readDismissedId() {
  try {
    return window.localStorage.getItem(dismissedStorageKey);
  } catch {
    return null;
  }
}

function subscribeToDismissal(onChange: () => void) {
  window.addEventListener(dismissEventName, onChange);
  return () => window.removeEventListener(dismissEventName, onChange);
}

export function AnnouncementBar({ announcement, dismissLabel }: { announcement: Announcement; dismissLabel: string }) {
  const dismissedId = useSyncExternalStore(subscribeToDismissal, readDismissedId, () => null);
  if (dismissedId === announcement.id) return null;
  const dismiss = () => {
    try {
      window.localStorage.setItem(dismissedStorageKey, announcement.id);
    } catch {}
    window.dispatchEvent(new Event(dismissEventName));
  };
  return (
    <section
      aria-label={announcement.message}
      className="flex w-full items-center gap-4 bg-panel px-gutter py-2.5 text-body-sm text-panel-ink"
    >
      <p className="min-w-0 flex-1">
        {announcement.message}{" "}
        <AppLink href={announcement.linkHref} className="font-semibold text-brand underline-offset-4 hover:underline">
          {announcement.linkLabel} →
        </AppLink>
      </p>
      <button
        type="button"
        onClick={dismiss}
        aria-label={dismissLabel}
        className="grid size-9 shrink-0 place-items-center rounded-sm text-panel-muted hover:text-panel-ink"
      >
        <X aria-hidden="true" className="size-4" />
      </button>
    </section>
  );
}
