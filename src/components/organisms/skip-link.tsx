export function SkipLink({ label }: { label: string }) {
  return (
    <a
      href="#main-content"
      className="fixed top-2 left-2 z-50 -translate-y-24 rounded-md bg-brand px-4 py-2.5 font-display font-bold text-on-brand transition-transform focus:translate-y-0"
    >
      {label}
    </a>
  );
}
