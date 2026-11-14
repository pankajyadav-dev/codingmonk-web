import { AppLink } from "@/components/atoms/app-link";

export type BreadcrumbItem = { label: string; href?: string };

export function Breadcrumbs({ items, ariaLabel }: { items: BreadcrumbItem[]; ariaLabel: string }) {
  return (
    <nav aria-label={ariaLabel}>
      <ol className="flex flex-wrap items-center gap-2 text-body-sm text-muted">
        {items.map((item, itemIndex) => (
          <li key={item.label} className="flex items-center gap-2">
            {itemIndex > 0 ? <span aria-hidden="true">/</span> : null}
            {item.href ? (
              <AppLink href={item.href} className="hover:text-brand-strong">
                {item.label}
              </AppLink>
            ) : (
              <span aria-current="page" className="text-ink">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
