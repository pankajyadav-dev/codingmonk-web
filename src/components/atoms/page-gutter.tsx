import { cn } from "@/lib/class-names";

export function PageGutter({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("w-full px-gutter", className)}>{children}</div>;
}
