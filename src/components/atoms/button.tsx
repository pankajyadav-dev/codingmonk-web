import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";
import { cn } from "@/lib/class-names";
import { AppLink, type AppLinkProps } from "./app-link";

export const buttonStyles = cva(
  "inline-flex min-h-11 items-center justify-center gap-2 whitespace-nowrap rounded-md border-[1.5px] font-display font-bold transition-[transform,box-shadow,background-color,border-color] duration-150 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "border-transparent bg-brand text-on-brand shadow-brand hover:-translate-y-0.5",
        secondary: "border-line bg-surface text-ink hover:border-brand",
        onPanel: "border-panel-line bg-transparent text-panel-ink hover:border-brand",
        whatsapp: "border-transparent bg-whatsapp text-on-whatsapp hover:-translate-y-0.5",
      },
      size: {
        md: "px-5 py-3 text-[0.95rem]",
        sm: "min-h-10 px-4 py-2 text-[0.85rem]",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

type ButtonStyleProps = VariantProps<typeof buttonStyles>;

export function Button({
  variant,
  size,
  className,
  type = "button",
  ...buttonProps
}: ComponentProps<"button"> & ButtonStyleProps) {
  return <button type={type} className={cn(buttonStyles({ variant, size }), className)} {...buttonProps} />;
}

export function ButtonLink({ variant, size, className, ...linkProps }: AppLinkProps & ButtonStyleProps) {
  return <AppLink className={cn(buttonStyles({ variant, size }), className)} {...linkProps} />;
}
