"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";
import { cn } from "@/lib/class-names";

const subscribeToNothing = () => () => {};

export function ThemeSwitcher({ toggleLabel, className }: { toggleLabel: string; className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const hasMounted = useSyncExternalStore(
    subscribeToNothing,
    () => true,
    () => false,
  );
  const isDarkTheme = hasMounted && resolvedTheme === "dark";
  return (
    <button
      type="button"
      aria-label={toggleLabel}
      aria-pressed={hasMounted ? isDarkTheme : undefined}
      onClick={() => setTheme(isDarkTheme ? "light" : "dark")}
      className={cn(
        "grid size-11 place-items-center rounded-md border border-line bg-surface text-ink transition-colors hover:border-brand",
        className,
      )}
    >
      <Moon aria-hidden="true" className="size-5 dark:hidden" />
      <Sun aria-hidden="true" className="hidden size-5 dark:block" />
    </button>
  );
}
