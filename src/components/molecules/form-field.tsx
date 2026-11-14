import { FieldError, FieldLabel } from "@/components/atoms/form-controls";
import { cn } from "@/lib/class-names";

type FormFieldProps = {
  fieldId: string;
  label: string;
  optionalLabel?: string;
  errorMessage?: string;
  isWide?: boolean;
  children: React.ReactNode;
};

export function getFieldErrorId(fieldId: string) {
  return `${fieldId}-error`;
}

export function FormField({ fieldId, label, optionalLabel, errorMessage, isWide, children }: FormFieldProps) {
  return (
    <div className={cn("grid content-start gap-1.5", isWide && "sm:col-span-2")}>
      <FieldLabel htmlFor={fieldId}>
        {label}
        {optionalLabel ? <span className="font-normal text-muted"> ({optionalLabel})</span> : null}
      </FieldLabel>
      {children}
      <FieldError id={getFieldErrorId(fieldId)} message={errorMessage} />
    </div>
  );
}
