"use client";

import { Check } from "lucide-react";
import type { Route } from "next";
import { useRouter, useSearchParams } from "next/navigation";
import { useActionState, useEffect, useRef, useState } from "react";
import { Button } from "@/components/atoms/button";
import { CheckboxInput, SelectInput, TextArea, TextInput } from "@/components/atoms/form-controls";
import { FormField, getFieldErrorId } from "@/components/molecules/form-field";
import type { BookDemoCopy } from "@/content/page-template-schemas";
import { cn } from "@/lib/class-names";
import {
  collectFieldErrorCodes,
  type DemoRequestAction,
  type DemoRequestErrorCode,
  type DemoRequestField,
  type DemoRequestResult,
  demoRequestFieldsByStep,
  demoRequestSchema,
  designations,
  honeypotFieldName,
  indianStatesAndTerritories,
  notSureProgramValue,
  placementSeasons,
  requestTypes,
  studentsYears,
} from "@/lib/demo-request";

type FormStepId = keyof typeof demoRequestFieldsByStep;
type ProgramOption = { slug: string; title: string };
type FieldErrorCodes = Partial<Record<DemoRequestField, DemoRequestErrorCode>>;

type DemoRequestFormProps = {
  submitAction: DemoRequestAction;
  formCopy: BookDemoCopy["form"];
  programOptions: ProgramOption[];
  sourcePath: string;
};

const formStepOrder: FormStepId[] = ["college", "batch", "contact"];
const initialResult: DemoRequestResult = { status: "idle" };

function findStepOfField(fieldName: DemoRequestField): FormStepId {
  return (
    formStepOrder.find((stepId) => (demoRequestFieldsByStep[stepId] as readonly string[]).includes(fieldName)) ??
    "contact"
  );
}

function validateFields(formElement: HTMLFormElement, fieldNames: readonly DemoRequestField[]): FieldErrorCodes {
  const pickedFields = Object.fromEntries(fieldNames.map((fieldName) => [fieldName, true])) as Partial<
    Record<DemoRequestField, true>
  >;
  const parsed = demoRequestSchema.pick(pickedFields).safeParse(Object.fromEntries(new FormData(formElement)));
  return parsed.success ? {} : collectFieldErrorCodes(parsed.error.issues);
}

type RequestType = (typeof requestTypes)[number];

function isRequestType(value: string | null): value is RequestType {
  return requestTypes.some((requestType) => requestType === value);
}

export function DemoRequestForm({ submitAction, formCopy, programOptions, sourcePath }: DemoRequestFormProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const formRef = useRef<HTMLFormElement>(null);
  const [result, formAction, isSubmitting] = useActionState(submitAction, initialResult);
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [clientErrorCodes, setClientErrorCodes] = useState<FieldErrorCodes>({});
  const requestedType = searchParams.get("request");
  const requestTypeFromLink: RequestType = isRequestType(requestedType) ? requestedType : "campus-demo";
  const [selectedRequestType, setSelectedRequestType] = useState<RequestType>(requestTypeFromLink);
  const [lastLinkedRequestType, setLastLinkedRequestType] = useState<RequestType>(requestTypeFromLink);
  if (lastLinkedRequestType !== requestTypeFromLink) {
    setLastLinkedRequestType(requestTypeFromLink);
    setSelectedRequestType(requestTypeFromLink);
  }
  const fieldCopy = formCopy.fields;
  const activeStepId = formStepOrder[activeStepIndex] ?? "college";

  const errorCodes: FieldErrorCodes =
    result.status === "invalid" ? { ...result.fieldErrorCodes, ...clientErrorCodes } : clientErrorCodes;
  const errorMessageFor = (fieldName: DemoRequestField) => {
    const errorCode = errorCodes[fieldName];
    return errorCode ? formCopy.errors[errorCode] : undefined;
  };
  const describedBy = (fieldName: DemoRequestField) => (errorCodes[fieldName] ? getFieldErrorId(fieldName) : undefined);

  useEffect(() => {
    if (result.status === "saved") {
      window.open(result.whatsappUrl, "_blank", "noopener,noreferrer");
      router.push(`/thank-you?reference=${encodeURIComponent(result.referenceCode)}` as Route);
    }
    if (result.status === "invalid") {
      const [firstInvalidField] = Object.keys(result.fieldErrorCodes) as DemoRequestField[];
      if (firstInvalidField) setActiveStepIndex(formStepOrder.indexOf(findStepOfField(firstInvalidField)));
    }
  }, [result, router]);

  const focusFirstInvalidField = (fieldErrors: FieldErrorCodes) => {
    const [firstInvalidField] = Object.keys(fieldErrors);
    if (firstInvalidField) requestAnimationFrame(() => document.getElementById(firstInvalidField)?.focus());
  };

  const goToNextStep = () => {
    if (!formRef.current) return;
    const stepErrors = validateFields(formRef.current, demoRequestFieldsByStep[activeStepId]);
    setClientErrorCodes(stepErrors);
    if (Object.keys(stepErrors).length > 0) return focusFirstInvalidField(stepErrors);
    setActiveStepIndex((stepIndex) => Math.min(stepIndex + 1, formStepOrder.length - 1));
  };

  const validateBeforeSubmit = (submitEvent: React.FormEvent<HTMLFormElement>) => {
    const allFieldNames = formStepOrder.flatMap((stepId) => demoRequestFieldsByStep[stepId]);
    const allErrors = validateFields(submitEvent.currentTarget, allFieldNames);
    setClientErrorCodes(allErrors);
    const [firstInvalidField] = Object.keys(allErrors) as DemoRequestField[];
    if (firstInvalidField) {
      submitEvent.preventDefault();
      setActiveStepIndex(formStepOrder.indexOf(findStepOfField(firstInvalidField)));
      focusFirstInvalidField(allErrors);
    }
  };

  const isStepVisible = (stepId: FormStepId) => stepId === activeStepId;
  const isLastStep = activeStepIndex === formStepOrder.length - 1;

  return (
    <form
      ref={formRef}
      action={formAction}
      onSubmit={validateBeforeSubmit}
      noValidate
      className="grid gap-6 rounded-2xl border border-line bg-background p-5 sm:p-7 lg:p-9"
    >
      <ol className="flex flex-wrap items-center gap-2">
        {formStepOrder.map((stepId, stepIndex) => {
          const stepCopy = formCopy.steps.find((step) => step.id === stepId);
          const isDone = stepIndex < activeStepIndex;
          const isCurrent = stepIndex === activeStepIndex;
          return (
            <li key={stepId} className="flex items-center gap-2">
              {stepIndex > 0 ? <span aria-hidden="true" className="h-0.5 w-7 bg-line" /> : null}
              <span
                aria-current={isCurrent ? "step" : undefined}
                className={cn(
                  "flex items-center gap-2 text-body-sm font-semibold",
                  isCurrent ? "text-ink" : "text-muted",
                )}
              >
                <span
                  className={cn(
                    "grid size-7 place-items-center rounded-full border-2 text-caption font-bold",
                    isCurrent && "border-brand bg-brand text-on-brand",
                    isDone && "border-success text-success",
                    !isCurrent && !isDone && "border-line",
                  )}
                >
                  {isDone ? <Check aria-hidden="true" className="size-4" /> : stepIndex + 1}
                </span>
                {stepCopy?.title}
              </span>
            </li>
          );
        })}
      </ol>

      <h2 className="font-display text-heading-lg font-bold">{formCopy.steps[activeStepIndex]?.heading}</h2>

      <input type="hidden" name="sourcePath" value={sourcePath} />
      <div aria-hidden="true" className="absolute -left-[9999px] size-px overflow-hidden">
        <label htmlFor={honeypotFieldName}>{formCopy.honeypotLabel}</label>
        <input id={honeypotFieldName} name={honeypotFieldName} type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <fieldset hidden={!isStepVisible("college")} className="grid gap-x-5 gap-y-3 sm:grid-cols-2">
        <legend className="sr-only">{formCopy.steps[0]?.heading}</legend>
        <FormField
          fieldId="requestType"
          label={fieldCopy.requestType.label}
          errorMessage={errorMessageFor("requestType")}
          isWide
        >
          <SelectInput
            id="requestType"
            name="requestType"
            value={selectedRequestType}
            onChange={(changeEvent) => {
              if (isRequestType(changeEvent.target.value)) setSelectedRequestType(changeEvent.target.value);
            }}
            autoComplete="off"
            aria-invalid={Boolean(errorCodes.requestType)}
            aria-describedby={describedBy("requestType")}
          >
            {requestTypes.map((requestType) => (
              <option key={requestType} value={requestType}>
                {fieldCopy.requestType.options[requestType]}
              </option>
            ))}
          </SelectInput>
        </FormField>
        <FormField
          fieldId="collegeName"
          label={fieldCopy.collegeName.label}
          errorMessage={errorMessageFor("collegeName")}
          isWide
        >
          <TextInput
            id="collegeName"
            name="collegeName"
            autoComplete="organization"
            placeholder={fieldCopy.collegeName.placeholder}
            aria-invalid={Boolean(errorCodes.collegeName)}
            aria-describedby={describedBy("collegeName")}
          />
        </FormField>
        <FormField fieldId="city" label={fieldCopy.city.label} errorMessage={errorMessageFor("city")}>
          <TextInput
            id="city"
            name="city"
            autoComplete="address-level2"
            aria-invalid={Boolean(errorCodes.city)}
            aria-describedby={describedBy("city")}
          />
        </FormField>
        <FormField fieldId="state" label={fieldCopy.state.label} errorMessage={errorMessageFor("state")}>
          <SelectInput
            id="state"
            name="state"
            defaultValue=""
            aria-invalid={Boolean(errorCodes.state)}
            aria-describedby={describedBy("state")}
          >
            <option value="" disabled>
              {formCopy.selectPlaceholder}
            </option>
            {indianStatesAndTerritories.map((stateName) => (
              <option key={stateName} value={stateName}>
                {stateName}
              </option>
            ))}
          </SelectInput>
        </FormField>
      </fieldset>

      <fieldset hidden={!isStepVisible("batch")} className="grid gap-x-5 gap-y-3 sm:grid-cols-2">
        <legend className="sr-only">{formCopy.steps[1]?.heading}</legend>
        <FormField
          fieldId="studentsYear"
          label={fieldCopy.studentsYear.label}
          errorMessage={errorMessageFor("studentsYear")}
        >
          <SelectInput
            id="studentsYear"
            name="studentsYear"
            defaultValue=""
            aria-invalid={Boolean(errorCodes.studentsYear)}
            aria-describedby={describedBy("studentsYear")}
          >
            <option value="" disabled>
              {formCopy.selectPlaceholder}
            </option>
            {studentsYears.map((studentsYear) => (
              <option key={studentsYear} value={studentsYear}>
                {fieldCopy.studentsYear.options[studentsYear]}
              </option>
            ))}
          </SelectInput>
        </FormField>
        <FormField
          fieldId="programInterest"
          label={fieldCopy.programInterest.label}
          errorMessage={errorMessageFor("programInterest")}
        >
          <SelectInput
            id="programInterest"
            name="programInterest"
            defaultValue=""
            aria-invalid={Boolean(errorCodes.programInterest)}
            aria-describedby={describedBy("programInterest")}
          >
            <option value="" disabled>
              {formCopy.selectPlaceholder}
            </option>
            {programOptions.map((programOption) => (
              <option key={programOption.slug} value={programOption.slug}>
                {programOption.title}
              </option>
            ))}
            <option value={notSureProgramValue}>{fieldCopy.programInterest.notSureLabel}</option>
          </SelectInput>
        </FormField>
        <FormField fieldId="batchSize" label={fieldCopy.batchSize.label} errorMessage={errorMessageFor("batchSize")}>
          <TextInput
            id="batchSize"
            name="batchSize"
            type="number"
            inputMode="numeric"
            min={10}
            max={5000}
            placeholder={fieldCopy.batchSize.placeholder}
            aria-invalid={Boolean(errorCodes.batchSize)}
            aria-describedby={describedBy("batchSize")}
          />
        </FormField>
        <FormField
          fieldId="placementSeason"
          label={fieldCopy.placementSeason.label}
          errorMessage={errorMessageFor("placementSeason")}
        >
          <SelectInput
            id="placementSeason"
            name="placementSeason"
            defaultValue=""
            aria-invalid={Boolean(errorCodes.placementSeason)}
            aria-describedby={describedBy("placementSeason")}
          >
            <option value="" disabled>
              {formCopy.selectPlaceholder}
            </option>
            {placementSeasons.map((placementSeason) => (
              <option key={placementSeason} value={placementSeason}>
                {fieldCopy.placementSeason.options[placementSeason]}
              </option>
            ))}
          </SelectInput>
        </FormField>
      </fieldset>

      <fieldset hidden={!isStepVisible("contact")} className="grid gap-x-5 gap-y-3 sm:grid-cols-2">
        <legend className="sr-only">{formCopy.steps[2]?.heading}</legend>
        <FormField
          fieldId="contactName"
          label={fieldCopy.contactName.label}
          errorMessage={errorMessageFor("contactName")}
        >
          <TextInput
            id="contactName"
            name="contactName"
            autoComplete="name"
            aria-invalid={Boolean(errorCodes.contactName)}
            aria-describedby={describedBy("contactName")}
          />
        </FormField>
        <FormField
          fieldId="designation"
          label={fieldCopy.designation.label}
          errorMessage={errorMessageFor("designation")}
        >
          <SelectInput
            id="designation"
            name="designation"
            defaultValue=""
            aria-invalid={Boolean(errorCodes.designation)}
            aria-describedby={describedBy("designation")}
          >
            <option value="" disabled>
              {formCopy.selectPlaceholder}
            </option>
            {designations.map((designation) => (
              <option key={designation} value={designation}>
                {fieldCopy.designation.options[designation]}
              </option>
            ))}
          </SelectInput>
        </FormField>
        <FormField fieldId="phone" label={fieldCopy.phone.label} errorMessage={errorMessageFor("phone")}>
          <TextInput
            id="phone"
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder={fieldCopy.phone.placeholder}
            aria-invalid={Boolean(errorCodes.phone)}
            aria-describedby={describedBy("phone")}
          />
        </FormField>
        <FormField fieldId="email" label={fieldCopy.email.label} errorMessage={errorMessageFor("email")}>
          <TextInput
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder={fieldCopy.email.placeholder}
            aria-invalid={Boolean(errorCodes.email)}
            aria-describedby={describedBy("email")}
          />
        </FormField>
        <FormField fieldId="message" label={fieldCopy.message.label} optionalLabel={formCopy.optionalLabel} isWide>
          <TextArea id="message" name="message" rows={3} placeholder={fieldCopy.message.placeholder} />
        </FormField>
        <div className="grid gap-1.5 sm:col-span-2">
          <label htmlFor="consent" className="flex items-start gap-3 text-body-sm text-ink">
            <CheckboxInput
              id="consent"
              name="consent"
              aria-invalid={Boolean(errorCodes.consent)}
              aria-describedby={describedBy("consent")}
            />
            {fieldCopy.consent.label}
          </label>
          <p
            id={getFieldErrorId("consent")}
            role={errorCodes.consent ? "alert" : undefined}
            className="min-h-5 text-body-sm text-danger"
          >
            {errorMessageFor("consent")}
          </p>
        </div>
      </fieldset>

      {result.status === "rate-limited" || result.status === "failed" ? (
        <p role="alert" className="rounded-md border border-danger px-4 py-3 text-body-sm text-danger">
          {result.status === "rate-limited" ? formCopy.errors.tooManyRequests : formCopy.errors.serverError}
        </p>
      ) : null}

      <div className="flex flex-wrap items-center justify-between gap-3">
        {activeStepIndex > 0 ? (
          <Button variant="secondary" onClick={() => setActiveStepIndex((stepIndex) => Math.max(stepIndex - 1, 0))}>
            ← {formCopy.backLabel}
          </Button>
        ) : (
          <span />
        )}
        {isLastStep ? (
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? formCopy.submittingLabel : formCopy.submitLabel}
          </Button>
        ) : (
          <Button onClick={goToNextStep}>{formCopy.continueLabel} →</Button>
        )}
      </div>
    </form>
  );
}
