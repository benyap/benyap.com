import { Metadata } from "next";

import { AppHeader } from "~/components/admin/AppHeader";
import { AppSidebar } from "~/components/admin/AppSidebar";
import { RequireSignIn } from "~/components/auth/RequireSignIn/RequireSignIn";
import { FirebaseUserProvider } from "~/components/firebase/FirebaseUserProvider";
import { SidebarProvider } from "~/components/ui/sidebar";

export const metadata: Metadata = {
  title: "Admin",
};

export default function Layout(props: React.PropsWithChildren) {
  const { children } = props;
  return (
    <FirebaseUserProvider>
      <RequireSignIn>
        <SidebarProvider className="min-w-screen">
          <AppSidebar />
          <div className="w-full">
            <AppHeader />
            <main className="m-4">{children}</main>
          </div>
        </SidebarProvider>
      </RequireSignIn>
    </FirebaseUserProvider>
  );
}
