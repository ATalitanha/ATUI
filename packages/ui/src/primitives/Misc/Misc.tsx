import React, { forwardRef } from "react";
import { cn } from "@aurora-ui/utils";

// --- LINK ---
export interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  external?: boolean;
}
export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  ({ external, className, children, ...props }, ref) => {
    return (
      <a
        ref={ref}
        className={cn(
          "text-[var(--aurora-fg-primary)] hover:text-[var(--aurora-primary-hover)] transition-colors underline underline-offset-4 decoration-[var(--aurora-border-strong)] hover:decoration-current",
          className
        )}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        {...props}
      >
        {children}
      </a>
    );
  }
);
Link.displayName = "Link";

// --- BADGE ---
export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "solid" | "soft" | "outline";
  tone?: "primary" | "accent";
}
export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ variant = "soft", tone = "primary", className, children, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(
          "inline-flex items-center px-2 py-0.5 text-xs font-semibold rounded-full select-none",
          {
            "bg-[var(--aurora-primary)] text-[var(--aurora-fg-inverse)]": variant === "solid" && tone === "primary",
            "bg-[var(--aurora-accent)] text-[var(--aurora-fg-inverse)]": variant === "solid" && tone === "accent",
            "bg-[var(--aurora-primary-subtle)] text-[var(--aurora-fg-primary)] border border-[var(--aurora-primary-border)]": variant === "soft" && tone === "primary",
            "bg-[var(--aurora-accent-subtle)] text-[var(--aurora-fg-accent)] border border-[var(--aurora-accent-border)]": variant === "soft" && tone === "accent",
            "border border-[var(--aurora-border-strong)] text-[var(--aurora-fg-base)] bg-transparent": variant === "outline",
          },
          className
        )}
        {...props}
      >
        {children}
      </span>
    );
  }
);
Badge.displayName = "Badge";

// --- AVATAR ---
export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  fallback: string;
  size?: "sm" | "md" | "lg";
}
export const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
  ({ src, alt, fallback, size = "md", className, ...props }, ref) => {
    const [hasError, setHasError] = React.useState(false);
    const sizeMap = {
      sm: "h-8 w-8 text-xs",
      md: "h-10 w-10 text-sm",
      lg: "h-12 w-12 text-base",
    };

    return (
      <div
        ref={ref}
        className={cn(
          "relative flex shrink-0 overflow-hidden rounded-full border border-[var(--aurora-border-base)] bg-[var(--aurora-bg-surface-hover)] justify-center items-center font-semibold text-[var(--aurora-fg-muted)]",
          sizeMap[size],
          className
        )}
        {...props}
      >
        {src && !hasError ? (
          <img
            src={src}
            alt={alt}
            onError={() => setHasError(true)}
            className="h-full w-full object-cover"
          />
        ) : (
          <span>{fallback.substring(0, 2).toUpperCase()}</span>
        )}
      </div>
    );
  }
);
Avatar.displayName = "Avatar";

// --- CHIP ---
export interface ChipProps extends React.HTMLAttributes<HTMLDivElement> {
  onClose?: () => void;
}
export const Chip = forwardRef<HTMLDivElement, ChipProps>(
  ({ onClose, className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "inline-flex items-center gap-1.5 px-3 py-1 text-sm rounded-full bg-[var(--aurora-bg-surface-hover)] border border-[var(--aurora-border-base)] text-[var(--aurora-fg-base)] select-none",
          className
        )}
        {...props}
      >
        {children}
        {onClose && (
          <button
            onClick={onClose}
            className="hover:text-[var(--aurora-primary)] rounded-full p-0.5 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--aurora-primary)]"
            aria-label="Remove"
          >
            ×
          </button>
        )}
      </div>
    );
  }
);
Chip.displayName = "Chip";

// --- SPINNER ---
export const Spinner: React.FC<{ size?: number; className?: string }> = ({ size = 20, className }) => {
  return (
    <svg
      className={cn("animate-spin text-[var(--aurora-primary)]", className)}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      width={size}
      height={size}
    >
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
};

// --- SKELETON ---
export const Skeleton: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div
      className={cn(
        "animate-pulse rounded-[var(--aurora-radius-md)] bg-[var(--aurora-bg-surface-hover)] border border-[var(--aurora-border-subtle)]",
        className
      )}
    />
  );
};