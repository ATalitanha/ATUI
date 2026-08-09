"use client";

import "../app/globals.css";
import { AuroraProvider } from "@atui/ui";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AuroraProvider defaultTheme="dark">
          {children}
        </AuroraProvider>
      </body>
    </html>
  );
}