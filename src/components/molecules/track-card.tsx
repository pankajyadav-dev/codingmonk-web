import { Badge } from "@/components/atoms/badge";
import type { Track } from "@/content/schemas";

export function TrackCard({ track }: { track: Track }) {
  return (
    <article className="flex h-full flex-col gap-3 rounded-xl border border-line bg-background p-5 lg:p-7">
      <h3 className="font-display text-heading-lg font-bold">{track.title}</h3>
      <p className="text-body text-muted">{track.description}</p>
      <ul className="mt-auto flex flex-wrap gap-2 pt-2">
        {track.companyTests.map((companyTest) => (
          <li key={companyTest}>
            <Badge variant="tag">{companyTest}</Badge>
          </li>
        ))}
      </ul>
    </article>
  );
}
