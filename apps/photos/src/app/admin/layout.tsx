import clsx from "clsx";
import { Metadata } from "next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Newsreader, Geist_Mono, Inter } from "next/font/google";

import { DESCRIPTION_ADMIN, SITE_NAME_ADMIN } from "~/constants/metadata";
import { APP_HOST } from "~/constants/app";

import { SidebarProvider } from "~/components/ui/sidebar";
import { AppHeader } from "~/components/admin/AppHeader";
import { AppSidebar } from "~/components/admin/AppSidebar";
import { RequireSignIn } from "~/components/auth/RequireSignIn/RequireSignIn";
import { FirebaseUserProvider } from "~/components/firebase/FirebaseUserProvider";
import { FirebaseProvider } from "~/components/firebase/FirebaseProvider";

const sans = Inter({ subsets: ["latin"], variable: "--font-sans" });
const serif = Newsreader({ subsets: ["latin"], variable: "--font-serif" });
const mono = Geist_Mono({ subsets: ["latin"], variable: "--font-mono" });

import "~/app/globals.css";

export const metadata: Metadata = {
  title: {
    default: SITE_NAME_ADMIN,
    template: `%s - ${SITE_NAME_ADMIN}`,
  },
  description: DESCRIPTION_ADMIN,
  openGraph: {
    type: "website",
    title: SITE_NAME_ADMIN,
    siteName: SITE_NAME_ADMIN,
    description: DESCRIPTION_ADMIN,
    url: `https://${APP_HOST}`,
  },
};

export default function Layout(props: React.PropsWithChildren) {
  const { children } = props;
  return (
    <html
      lang="en"
      className={clsx(sans.variable, serif.variable, mono.variable)}
    >
      <body>
        <FirebaseProvider>
          <FirebaseUserProvider>
            <RequireSignIn>
              <SidebarProvider>
                <AppSidebar />
                <div className="w-full">
                  <AppHeader />
                  <main className="m-4">{children}</main>
                </div>
              </SidebarProvider>
            </RequireSignIn>
          </FirebaseUserProvider>
        </FirebaseProvider>
        <SpeedInsights />
      </body>
    </html>
  );
}
