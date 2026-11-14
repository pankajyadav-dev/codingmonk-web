import { StatTile } from "@/components/molecules/stat-tile";
import type { Stat } from "@/content/schemas";

export function StatsGrid({ stats, sampleBadgeLabel }: { stats: Stat[]; sampleBadgeLabel: string }) {
  return (
    <ul className="grid grid-cols-2 gap-3 lg:grid-cols-[repeat(auto-fit,minmax(220px,1fr))] lg:gap-5">
      {stats.map((stat) => (
        <li key={stat.label}>
          <StatTile stat={stat} sampleBadgeLabel={sampleBadgeLabel} />
        </li>
      ))}
    </ul>
  );
}
