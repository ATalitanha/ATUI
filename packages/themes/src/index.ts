import { tokens } from "@aurora-ui/tokens";

export type ThemeType = "light" | "dark" | "high-contrast";

export interface AuroraTheme {
  name: ThemeType;
  variables: Record<string, string>;
}

export const lightTheme: AuroraTheme = {
  name: "light",
  variables: {
    // Core Base Surface
    "--aurora-bg-app": tokens.colors.aurora.slate[50],
    "--aurora-bg-surface": tokens.colors.base.white,
    "--aurora-bg-surface-hover": tokens.colors.aurora.slate[100],
    "--aurora-bg-surface-active": tokens.colors.aurora.slate[200],

    // Borders & Separators
    "--aurora-border-subtle": tokens.colors.aurora.slate[100],
    "--aurora-border-base": tokens.colors.aurora.slate[200],
    "--aurora-border-strong": tokens.colors.aurora.slate[400],

    // Typography Foreground
    "--aurora-fg-base": tokens.colors.aurora.slate[900],
    "--aurora-fg-muted": tokens.colors.aurora.slate[500],
    "--aurora-fg-subtle": tokens.colors.aurora.slate[400],
    "--aurora-fg-inverse": tokens.colors.base.white,

    // Brand Primary (Sophisticated futuristic Violet)
    "--aurora-primary": tokens.colors.aurora.violet[600],
    "--aurora-primary-hover": tokens.colors.aurora.violet[700],
    "--aurora-primary-active": tokens.colors.aurora.violet[800],
    "--aurora-primary-subtle": tokens.colors.aurora.violet[50],
    "--aurora-primary-border": tokens.colors.aurora.violet[200],
    "--aurora-fg-primary": tokens.colors.aurora.violet[600],

    // Accent (Intelligent futuristic Teal)
    "--aurora-accent": tokens.colors.aurora.teal[500],
    "--aurora-accent-hover": tokens.colors.aurora.teal[600],
    "--aurora-accent-active": tokens.colors.aurora.teal[700],
    "--aurora-accent-subtle": tokens.colors.aurora.teal[50],
    "--aurora-accent-border": tokens.colors.aurora.teal[200],
    "--aurora-fg-accent": tokens.colors.aurora.teal[600],

    // Shadows
    "--aurora-shadow-sm": tokens.shadows.xs,
    "--aurora-shadow-md": tokens.shadows.sm,
    "--aurora-shadow-lg": tokens.shadows.md,

    // Glass effects
    "--aurora-glass-bg": "rgba(250, 250, 250, 0.7)",
    "--aurora-glass-border": "rgba(15, 23, 42, 0.08)",
    "--aurora-glass-blur": tokens.blur.md,
  }
};

export const darkTheme: AuroraTheme = {
  name: "dark",
  variables: {
    // Core Base Surface
    "--aurora-bg-app": tokens.colors.base.black,
    "--aurora-bg-surface": tokens.colors.aurora.slate[950],
    "--aurora-bg-surface-hover": tokens.colors.aurora.slate[900],
    "--aurora-bg-surface-active": tokens.colors.aurora.slate[800],

    // Borders & Separators
    "--aurora-border-subtle": tokens.colors.aurora.slate[900],
    "--aurora-border-base": tokens.colors.aurora.slate[800],
    "--aurora-border-strong": tokens.colors.aurora.slate[600],

    // Typography Foreground
    "--aurora-fg-base": tokens.colors.base.white,
    "--aurora-fg-muted": tokens.colors.aurora.slate[400],
    "--aurora-fg-subtle": tokens.colors.aurora.slate[500],
    "--aurora-fg-inverse": tokens.colors.aurora.slate[950],

    // Brand Primary (Futuristic Violet)
    "--aurora-primary": tokens.colors.aurora.violet[500],
    "--aurora-primary-hover": tokens.colors.aurora.violet[400],
    "--aurora-primary-active": tokens.colors.aurora.violet[300],
    "--aurora-primary-subtle": tokens.colors.aurora.violet[950],
    "--aurora-primary-border": tokens.colors.aurora.violet[800],
    "--aurora-fg-primary": tokens.colors.aurora.violet[400],

    // Accent (Intelligent Teal)
    "--aurora-accent": tokens.colors.aurora.teal[400],
    "--aurora-accent-hover": tokens.colors.aurora.teal[300],
    "--aurora-accent-active": tokens.colors.aurora.teal[200],
    "--aurora-accent-subtle": tokens.colors.aurora.teal[950],
    "--aurora-accent-border": tokens.colors.aurora.teal[800],
    "--aurora-fg-accent": tokens.colors.aurora.teal[400],

    // Shadows
    "--aurora-shadow-sm": "0 1px 2px 0 rgba(0, 0, 0, 0.5)",
    "--aurora-shadow-md": "0 4px 6px -1px rgba(0, 0, 0, 0.5)",
    "--aurora-shadow-lg": "0 10px 15px -3px rgba(0, 0, 0, 0.5)",

    // Glass effects
    "--aurora-glass-bg": "rgba(2, 6, 23, 0.7)",
    "--aurora-glass-border": "rgba(255, 255, 255, 0.08)",
    "--aurora-glass-blur": tokens.blur.lg,
  }
};

export const highContrastTheme: AuroraTheme = {
  name: "high-contrast",
  variables: {
    // Core Base Surface (Highly contrasting pure black and white)
    "--aurora-bg-app": tokens.colors.base.black,
    "--aurora-bg-surface": tokens.colors.base.black,
    "--aurora-bg-surface-hover": tokens.colors.aurora.slate[900],
    "--aurora-bg-surface-active": tokens.colors.aurora.slate[800],

    // Borders & Separators (Pure ultra-high contrast lines)
    "--aurora-border-subtle": tokens.colors.base.white,
    "--aurora-border-base": tokens.colors.base.white,
    "--aurora-border-strong": tokens.colors.base.white,

    // Typography Foreground
    "--aurora-fg-base": tokens.colors.base.white,
    "--aurora-fg-muted": tokens.colors.base.white,
    "--aurora-fg-subtle": tokens.colors.base.white,
    "--aurora-fg-inverse": tokens.colors.base.black,

    // Brand Primary
    "--aurora-primary": tokens.colors.base.white,
    "--aurora-primary-hover": tokens.colors.aurora.slate[100],
    "--aurora-primary-active": tokens.colors.aurora.slate[200],
    "--aurora-primary-subtle": tokens.colors.base.black,
    "--aurora-primary-border": tokens.colors.base.white,
    "--aurora-fg-primary": tokens.colors.base.white,

    // Accent
    "--aurora-accent": tokens.colors.base.white,
    "--aurora-accent-hover": tokens.colors.aurora.slate[100],
    "--aurora-accent-active": tokens.colors.aurora.slate[200],
    "--aurora-accent-subtle": tokens.colors.base.black,
    "--aurora-accent-border": tokens.colors.base.white,
    "--aurora-fg-accent": tokens.colors.base.white,

    // Shadows
    "--aurora-shadow-sm": tokens.shadows.none,
    "--aurora-shadow-md": tokens.shadows.none,
    "--aurora-shadow-lg": tokens.shadows.none,

    // Glass effects (Disabled for high contrast)
    "--aurora-glass-bg": tokens.colors.base.black,
    "--aurora-glass-border": tokens.colors.base.white,
    "--aurora-glass-blur": tokens.blur.none,
  }
};

export const themes = {
  light: lightTheme,
  dark: darkTheme,
  "high-contrast": highContrastTheme,
} as const;

export function getThemeCSSVariables(themeName: ThemeType): string {
  const selectedTheme = themes[themeName];
  return Object.entries(selectedTheme.variables)
    .map(([key, val]) => `${key}: ${val};`)
    .join("\n");
}