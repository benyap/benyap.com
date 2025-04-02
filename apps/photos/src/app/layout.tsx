import { Metadata } from "next";

import { DESCRIPTION, SITE_NAME } from "~/constants/metadata";
import { VERCEL_PROJECT_PRODUCTION_DOMAIN } from "~/constants/vercel";

import { FirebaseProvider } from "~/components/firebase/FirebaseProvider";

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
    <html lang="en">
      <body>
        <FirebaseProvider>{children}</FirebaseProvider>
      </body>
    </html>
  );
}
