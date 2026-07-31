import React from "react";
import { cn } from "@aurora-ui/utils";

// --- FIELD ---
export interface FieldProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: string;
  helperText?: string;
  errorMessage?: string;
}
export const Field: React.FC<FieldProps> = ({
  label,
  helperText,
  errorMessage,
  className,
  children,
  ...props
}) => {
  return (
    <div className={cn("flex flex-col gap-1.5 w-full", className)} {...props}>
      {label && (
        <span className="text-sm font-semibold text-[var(--aurora-fg-base)] select-none">
          {label}
        </span>
      )}
      {children}
      {helperText && !errorMessage && (
        <span className="text-xs text-[var(--aurora-fg-muted)]">
          {helperText}
        </span>
      )}
      {errorMessage && (
        <span className="text-xs text-red-500 font-medium">
          {errorMessage}
        </span>
      )}
    </div>
  );
};

// --- FORM SECTION ---
export interface FormSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: string;
}
export const FormSection: React.FC<FormSectionProps> = ({
  title,
  description,
  className,
  children,
  ...props
}) => {
  return (
    <div className={cn("space-y-4 pt-4 border-t border-[var(--aurora-border-subtle)] first:border-0 first:pt-0", className)} {...props}>
      <div>
        <h3 className="text-lg font-bold text-[var(--aurora-fg-base)]">{title}</h3>
        {description && <p className="text-sm text-[var(--aurora-fg-muted)]">{description}</p>}
      </div>
      <div className="grid gap-4">{children}</div>
    </div>
  );
};

// --- HELPERTEXT / ERROR ---
export const HelperText: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className,
}) => (
  <span className={cn("text-xs text-[var(--aurora-fg-muted)]", className)}>{children}</span>
);

export const ErrorMessage: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className,
}) => (
  <span className={cn("text-xs text-red-500 font-medium", className)}>{children}</span>
);