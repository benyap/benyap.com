import clsx from "clsx";
import { Metadata } from "next";
import { Newsreader, Outfit, Geist_Mono } from "next/font/google";

import { SITE_NAME, DESCRIPTION } from "~/constants/metadata";
import { APP_HOST } from "~/constants/app";

import { FirebaseProvider } from "~/components/firebase/FirebaseProvider";

const sans = Outfit({ subsets: ["latin"], variable: "--font-sans" });
const serif = Newsreader({ subsets: ["latin"], variable: "--font-serif" });
const mono = Geist_Mono({ subsets: ["latin"], variable: "--font-mono" });

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

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className={clsx(sans.variable, serif.variable, mono.variable)}>
      <FirebaseProvider>{children}</FirebaseProvider>
    </div>
  );
}
