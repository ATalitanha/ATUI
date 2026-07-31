import React, { forwardRef } from "react";
import { cn } from "@aurora-ui/utils";

// --- SEPARATOR / DIVIDER ---
export interface SeparatorProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: "horizontal" | "vertical";
}
export const Separator = forwardRef<HTMLDivElement, SeparatorProps>(
  ({ orientation = "horizontal", className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "bg-[var(--aurora-border-subtle)] shrink-0",
          orientation === "horizontal" ? "h-[1px] w-full" : "w-[1px] h-full",
          className
        )}
        {...props}
      />
    );
  }
);
Separator.displayName = "Separator";

// --- SURFACE ---
export interface SurfaceProps extends React.HTMLAttributes<HTMLDivElement> {
  glass?: boolean;
}
export const Surface = forwardRef<HTMLDivElement, SurfaceProps>(
  ({ glass = false, className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "bg-[var(--aurora-bg-surface)] border border-[var(--aurora-border-base)] text-[var(--aurora-fg-base)]",
          glass && "bg-[var(--aurora-glass-bg)] border-[var(--aurora-glass-border)] backdrop-blur-[var(--aurora-glass-blur)]",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
Surface.displayName = "Surface";

// --- CARD ---
export interface CardProps extends SurfaceProps {
  hoverable?: boolean;
}
export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ hoverable = false, className, children, ...props }, ref) => {
    return (
      <Surface
        ref={ref}
        className={cn(
          "rounded-[var(--aurora-radius-lg)] p-5 shadow-[var(--aurora-shadow-sm)] hover:shadow-[var(--aurora-shadow-md)] transition-all duration-300",
          hoverable && "hover:translate-y-[-2px] hover:border-[var(--aurora-border-strong)] cursor-pointer",
          className
        )}
        {...props}
      >
        {children}
      </Surface>
    );
  }
);
Card.displayName = "Card";

// --- PAPER ---
export interface PaperProps extends SurfaceProps {
  elevation?: "sm" | "md" | "lg";
}
export const Paper = forwardRef<HTMLDivElement, PaperProps>(
  ({ elevation = "md", className, children, ...props }, ref) => {
    return (
      <Surface
        ref={ref}
        className={cn(
          "rounded-[var(--aurora-radius-xl)] p-6 border border-[var(--aurora-border-subtle)]",
          {
            "shadow-[var(--aurora-shadow-sm)]": elevation === "sm",
            "shadow-[var(--aurora-shadow-md)]": elevation === "md",
            "shadow-[var(--aurora-shadow-lg)]": elevation === "lg",
          },
          className
        )}
        {...props}
      >
        {children}
      </Surface>
    );
  }
);
Paper.displayName = "Paper";