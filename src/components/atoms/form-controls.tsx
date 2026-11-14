import type { ComponentProps } from "react";
import { cn } from "@/lib/class-names";

const controlStyles =
  "w-full min-h-12 rounded-md border-[1.5px] border-line bg-background px-3.5 py-2.5 text-body text-ink placeholder:text-muted focus:border-brand focus:shadow-[0_0_0_3px_var(--brand-glow)] focus:outline-none aria-invalid:border-danger";

export function TextInput({ className, ...inputProps }: ComponentProps<"input">) {
  return <input className={cn(controlStyles, className)} {...inputProps} />;
}

export function SelectInput({ className, ...selectProps }: ComponentProps<"select">) {
  return <select className={cn(controlStyles, "appearance-auto pr-2", className)} {...selectProps} />;
}

export function TextArea({ className, ...textAreaProps }: ComponentProps<"textarea">) {
  return <textarea className={cn(controlStyles, "min-h-24 resize-y", className)} {...textAreaProps} />;
}

export function CheckboxInput({ className, ...inputProps }: Omit<ComponentProps<"input">, "type">) {
  return <input type="checkbox" className={cn("mt-1 size-5 shrink-0 accent-brand", className)} {...inputProps} />;
}

export function FieldLabel({ className, ...labelProps }: ComponentProps<"label">) {
  // biome-ignore lint/a11y/noLabelWithoutControl: htmlFor is always passed by the field molecule
  return <label className={cn("text-body-sm font-bold text-ink", className)} {...labelProps} />;
}

export function FieldError({ id, message }: { id: string; message?: string }) {
  return (
    <p id={id} role={message ? "alert" : undefined} className="min-h-5 text-body-sm text-danger">
      {message}
    </p>
  );
}
