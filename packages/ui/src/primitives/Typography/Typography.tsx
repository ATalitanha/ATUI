import React, { forwardRef } from "react";
import { cn } from "@aurora-ui/utils";

// Poly-wrapper to allow custom tags
export interface TextProps extends React.HTMLAttributes<HTMLSpanElement> {
  as?: "span" | "p" | "div" | "label" | "code" | "small";
  size?: "xs" | "sm" | "base" | "lg" | "xl" | "2xl";
  weight?: "normal" | "medium" | "semibold" | "bold";
  mono?: boolean;
}

export const Text = forwardRef<HTMLSpanElement, TextProps>(
  ({ as: Component = "span", size = "base", weight = "normal", mono = false, className, children, ...props }, ref) => {
    return (
      <Component
        ref={ref as any}
        className={cn(
          "text-[var(--aurora-fg-base)] tracking-normal leading-[var(--aurora-line-height-normal)]",
          mono ? "font-mono" : "font-sans",
          {
            "text-xs": size === "xs",
            "text-sm": size === "sm",
            "text-base": size === "base",
            "text-lg": size === "lg",
            "text-xl": size === "xl",
            "text-2xl": size === "2xl",
          },
          {
            "font-normal": weight === "normal",
            "font-medium": weight === "medium",
            "font-semibold": weight === "semibold",
            "font-bold": weight === "bold",
          },
          className
        )}
        {...props}
      >
        {children}
      </Component>
    );
  }
);
Text.displayName = "Text";

export interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  size?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl";
  weight?: "medium" | "semibold" | "bold" | "black";
}

export const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ as: Component = "h2", size = "lg", weight = "semibold", className, children, ...props }, ref) => {
    return (
      <Component
        ref={ref as any}
        className={cn(
          "text-[var(--aurora-fg-base)] tracking-tight leading-[var(--aurora-line-height-tight)] font-sans",
          {
            "text-lg": size === "sm",
            "text-xl": size === "md",
            "text-2xl": size === "lg",
            "text-3xl": size === "xl",
            "text-4xl": size === "2xl",
            "text-5xl": size === "3xl",
            "text-6xl": size === "4xl",
          },
          {
            "font-medium": weight === "medium",
            "font-semibold": weight === "semibold",
            "font-bold": weight === "bold",
            "font-black": weight === "black",
          },
          className
        )}
        {...props}
      >
        {children}
      </Component>
    );
  }
);
Heading.displayName = "Heading";