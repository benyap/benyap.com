import clsx from "clsx";
import { Outfit, Newsreader, Geist_Mono } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";

const outfit = Outfit({ subsets: ["latin"], variable: "--font-sans" });
const newsreader = Newsreader({ subsets: ["latin"], variable: "--font-serif" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-mono" });

import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={clsx(outfit.variable, newsreader.variable, geistMono.variable)}
    >
      <body>
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
