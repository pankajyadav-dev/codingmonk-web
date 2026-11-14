"use client";

import { Tabs } from "radix-ui";
import { LogoTile } from "@/components/molecules/logo-tile";

type LogoGroup = { label: string; organizationNames: string[] };

export function LogoWall({ eyebrow, logoGroups }: { eyebrow: string; logoGroups: LogoGroup[] }) {
  const visibleGroups = logoGroups.filter((logoGroup) => logoGroup.organizationNames.length > 0);
  const [firstGroup] = visibleGroups;
  if (!firstGroup) return null;
  return (
    <Tabs.Root defaultValue="logo-group-0" className="grid gap-4">
      <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3">
        <p className="text-eyebrow font-bold tracking-[0.12em] text-brand-strong uppercase">{eyebrow}</p>
        {visibleGroups.length > 1 ? (
          <Tabs.List aria-label={eyebrow} className="flex flex-wrap gap-2">
            {visibleGroups.map((logoGroup, groupIndex) => (
              <Tabs.Trigger
                key={logoGroup.label}
                value={`logo-group-${groupIndex}`}
                className="min-h-10 rounded-full border border-line bg-background px-4 text-body-sm font-semibold data-[state=active]:border-ink data-[state=active]:bg-ink data-[state=active]:text-background"
              >
                {logoGroup.label}
              </Tabs.Trigger>
            ))}
          </Tabs.List>
        ) : null}
      </div>
      {visibleGroups.map((logoGroup, groupIndex) => (
        <Tabs.Content key={logoGroup.label} value={`logo-group-${groupIndex}`}>
          <ul className="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-2.5">
            {logoGroup.organizationNames.map((organizationName) => (
              <LogoTile key={organizationName} organizationName={organizationName} />
            ))}
          </ul>
        </Tabs.Content>
      ))}
    </Tabs.Root>
  );
}
