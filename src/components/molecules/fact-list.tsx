export type Fact = { label: string; value: string };

export function FactList({ facts }: { facts: Fact[] }) {
  return (
    <dl className="grid grid-cols-[auto_minmax(0,1fr)] gap-x-5 gap-y-3">
      {facts.map((fact) => (
        <div key={fact.label} className="contents">
          <dt className="pt-0.5 text-body-sm text-muted">{fact.label}</dt>
          <dd className="font-semibold text-ink">{fact.value}</dd>
        </div>
      ))}
    </dl>
  );
}
