import clsx from "clsx";
import { Metadata } from "next";
import { Newsreader, Outfit, Geist_Mono } from "next/font/google";

import {
  SITE_NAME,
  DESCRIPTION,
  SITE_NAME_TEMPLATE,
} from "~/constants/metadata";
import { APP_URL } from "~/constants/app";

import { FirebaseProvider } from "~/components/firebase/FirebaseProvider";

const sans = Outfit({ subsets: ["latin"], variable: "--font-sans" });
const serif = Newsreader({ subsets: ["latin"], variable: "--font-serif" });
const mono = Geist_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const metadata: Metadata = {
  title: {
    default: SITE_NAME,
    template: SITE_NAME_TEMPLATE,
  },
  description: DESCRIPTION,
  openGraph: {
    type: "website",
    title: SITE_NAME,
    siteName: SITE_NAME,
    description: DESCRIPTION,
    url: APP_URL,
  },
};

export default function Layout({ children }: React.PropsWithChildren) {
  return (
    <div className={clsx(sans.variable, serif.variable, mono.variable)}>
      <FirebaseProvider>{children}</FirebaseProvider>
    </div>
  );
}
