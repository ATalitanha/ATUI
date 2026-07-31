import React, { createContext, useContext, useEffect, useState } from "react";
import { themes, type ThemeType } from "@aurora-ui/themes";

interface AuroraContextProps {
  theme: ThemeType;
  setTheme: (theme: ThemeType) => void;
}

const AuroraContext = createContext<AuroraContextProps | undefined>(undefined);

export const AuroraProvider: React.FC<{
  children: React.ReactNode;
  defaultTheme?: ThemeType;
}> = ({ children, defaultTheme = "dark" }) => {
  const [theme, setTheme] = useState<ThemeType>(defaultTheme);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("theme-light", "theme-dark", "theme-high-contrast");
    root.classList.add(`theme-${theme}`);

    const selectedTheme = themes[theme];
    if (selectedTheme) {
      Object.entries(selectedTheme.variables).forEach(([key, val]) => {
        root.style.setProperty(key, val as string);
      });
    }
  }, [theme]);

  return (
    <AuroraContext.Provider value={{ theme, setTheme }}>
      {children}
    </AuroraContext.Provider>
  );
};

export const useAuroraTheme = (): AuroraContextProps => {
  const context = useContext(AuroraContext);
  if (!context) {
    throw new Error("useAuroraTheme must be used within an AuroraProvider");
  }
  return context;
};