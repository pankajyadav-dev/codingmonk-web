type ContactMethodCardProps = { title: string; value?: string; description?: string; children?: React.ReactNode };

export function ContactMethodCard({ title, value, description, children }: ContactMethodCardProps) {
  return (
    <div className="grid gap-1 rounded-lg border border-line bg-surface p-5">
      <p className="font-display text-heading-sm font-bold">{title}</p>
      {value ? <p className="text-body font-semibold text-ink select-all">{value}</p> : null}
      {description ? <p className="text-body-sm text-muted">{description}</p> : null}
      {children ? <div className="pt-2">{children}</div> : null}
    </div>
  );
}
