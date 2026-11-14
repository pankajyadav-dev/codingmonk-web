export function LogoTile({ organizationName }: { organizationName: string }) {
  return (
    <li className="grid min-h-16 place-items-center rounded-md border border-line bg-background px-3 py-2 text-center font-display text-body-sm font-bold text-muted">
      {organizationName}
    </li>
  );
}
