import { SpeedInsights } from "@vercel/speed-insights/next";

import { ThemeProvider } from "~/components/ui/theme-provider";

import "~/app/globals.css";

export default function Layout({ children }: React.PropsWithChildren) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
        <SpeedInsights />
      </body>
    </html>
  );
}
