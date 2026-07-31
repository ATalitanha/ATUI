import React, { forwardRef } from "react";
import { motion } from "framer-motion";
import { cn, cva, type VariantProps } from "@aurora-ui/utils";
import { LoaderIcon } from "@aurora-ui/icons";

export const buttonVariants = cva(
  "inline-flex items-center justify-center font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-40 select-none active:scale-[0.98]",
  {
    variants: {
      variant: {
        solid: "bg-[var(--aurora-primary)] text-[var(--aurora-fg-inverse)] hover:bg-[var(--aurora-primary-hover)] active:bg-[var(--aurora-primary-active)]",
        soft: "bg-[var(--aurora-primary-subtle)] text-[var(--aurora-fg-primary)] hover:bg-[var(--aurora-border-subtle)] active:bg-[var(--aurora-border-base)]",
        outline: "border border-[var(--aurora-border-base)] bg-transparent text-[var(--aurora-fg-base)] hover:bg-[var(--aurora-bg-surface-hover)] active:bg-[var(--aurora-bg-surface-active)]",
        ghost: "bg-transparent text-[var(--aurora-fg-base)] hover:bg-[var(--aurora-bg-surface-hover)] active:bg-[var(--aurora-bg-surface-active)]",
        glass: "bg-[var(--aurora-glass-bg)] border border-[var(--aurora-glass-border)] backdrop-blur-[var(--aurora-glass-blur)] text-[var(--aurora-fg-base)] hover:bg-[var(--aurora-bg-surface-hover)]",
      },
      tone: {
        primary: "",
        accent: "bg-[var(--aurora-accent)] hover:bg-[var(--aurora-accent-hover)] active:bg-[var(--aurora-accent-active)] text-[var(--aurora-fg-inverse)]",
      },
      size: {
        sm: "h-8 px-3 text-xs rounded-[var(--aurora-radius-sm)] gap-1.5",
        md: "h-10 px-4 text-sm rounded-[var(--aurora-radius-md)] gap-2",
        lg: "h-12 px-6 text-base rounded-[var(--aurora-radius-lg)] gap-2.5",
      },
    },
    compoundVariants: [
      {
        variant: "soft",
        tone: "accent",
        className: "bg-[var(--aurora-accent-subtle)] text-[var(--aurora-fg-accent)] hover:bg-[var(--aurora-border-subtle)] active:bg-[var(--aurora-border-base)]",
      },
      {
        variant: "outline",
        tone: "accent",
        className: "border-[var(--aurora-accent-border)] text-[var(--aurora-fg-accent)] hover:bg-[var(--aurora-accent-subtle)]",
      }
    ],
    defaultVariants: {
      variant: "solid",
      tone: "primary",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  loading?: boolean;
  leadingIcon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      tone,
      size,
      loading = false,
      disabled,
      leadingIcon,
      trailingIcon,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <motion.button
        ref={ref}
        disabled={disabled || loading}
        className={cn(buttonVariants({ variant, tone, size, className }))}
        whileTap={{ scale: disabled || loading ? 1 : 0.98 }}
        {...(props as any)}
      >
        {loading && <LoaderIcon className="animate-spin" size={16} />}
        {!loading && leadingIcon && <span className="inline-flex">{leadingIcon}</span>}
        {children}
        {!loading && trailingIcon && <span className="inline-flex">{trailingIcon}</span>}
      </motion.button>
    );
  }
);

Button.displayName = "Button";
export default Button;