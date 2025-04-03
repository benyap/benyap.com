import clsx from "clsx";
import { Metadata } from "next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Newsreader, Outfit, Geist_Mono } from "next/font/google";

import { SITE_NAME, DESCRIPTION } from "~/constants/metadata";
import { APP_HOST } from "~/constants/app";

import { FirebaseProvider } from "~/components/firebase/FirebaseProvider";

const sans = Outfit({ subsets: ["latin"], variable: "--font-sans" });
const serif = Newsreader({ subsets: ["latin"], variable: "--font-serif" });
const mono = Geist_Mono({ subsets: ["latin"], variable: "--font-mono" });

import "~/app/globals.css";

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
    url: `https://${APP_HOST}`,
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
      className={clsx(sans.variable, serif.variable, mono.variable)}
    >
      <body>
        <FirebaseProvider>{children}</FirebaseProvider>
        <SpeedInsights />
      </body>
    </html>
  );
}
