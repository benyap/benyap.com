import clsx from "clsx";
import { Metadata } from "next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Newsreader, Geist_Mono, Inter } from "next/font/google";

import {
  DESCRIPTION_ADMIN,
  SITE_NAME_ADMIN,
  SITE_NAME_ADMIN_TEMPLATE,
} from "~/constants/metadata";
import { APP_URL } from "~/constants/app";

import { SidebarProvider } from "~/components/ui/sidebar";
import { Toaster } from "~/components/ui/sonner";
import { AdminHeader } from "~/components/admin/AdminHeader";
import { AdminSidebar } from "~/components/admin/AdminSidebar";
import { RequireSignIn } from "~/components/admin/RequireSignIn";
import { FirebaseUserProvider } from "~/components/firebase/FirebaseUserProvider";
import { FirebaseProvider } from "~/components/firebase/FirebaseProvider";

const sans = Inter({ subsets: ["latin"], variable: "--font-sans" });
const serif = Newsreader({ subsets: ["latin"], variable: "--font-serif" });
const mono = Geist_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const metadata: Metadata = {
  title: {
    default: SITE_NAME_ADMIN,
    template: SITE_NAME_ADMIN_TEMPLATE,
  },
  description: DESCRIPTION_ADMIN,
  openGraph: {
    type: "website",
    title: SITE_NAME_ADMIN,
    siteName: SITE_NAME_ADMIN,
    description: DESCRIPTION_ADMIN,
    url: APP_URL,
  },
};

export default function Layout(props: React.PropsWithChildren) {
  const { children } = props;
  return (
    <div className={clsx(sans.variable, serif.variable, mono.variable)}>
      <FirebaseProvider>
        <FirebaseUserProvider>
          <RequireSignIn>
            <SidebarProvider>
              <AdminSidebar />
              <div className="w-full">
                <AdminHeader />
                <main className="@container m-4">{children}</main>
                <Toaster />
              </div>
            </SidebarProvider>
          </RequireSignIn>
        </FirebaseUserProvider>
      </FirebaseProvider>
      <SpeedInsights />
    </div>
  );
}
