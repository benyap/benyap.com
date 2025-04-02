import clsx from "clsx";
import { Metadata } from "next";
import { Outfit, Newsreader, Geist_Mono } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";

import { DESCRIPTION, SITE_NAME } from "~/constants/metadata";
import { VERCEL_PROJECT_PRODUCTION_DOMAIN } from "~/constants/vercel";

import { FirebaseProvider } from "~/providers/Firebase";

const outfit = Outfit({ subsets: ["latin"], variable: "--font-sans" });
const newsreader = Newsreader({ subsets: ["latin"], variable: "--font-serif" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-mono" });

import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: SITE_NAME,
    template: `%s - ${SITE_NAME}`,
  },
  description: DESCRIPTION,
  openGraph: {
    type: "website",
    title: SITE_NAME,
    siteName: SITE_NAME,
    description: DESCRIPTION,
    url: `https://${VERCEL_PROJECT_PRODUCTION_DOMAIN}`,
  },
};

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
        <FirebaseProvider>{children}</FirebaseProvider>
        <SpeedInsights />
      </body>
    </html>
  );
}
