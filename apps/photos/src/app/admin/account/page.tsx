import { Metadata } from "next";

import { AdminBreadcrumbs } from "~/components/core/Breadcrumbs";
import { Heading } from "~/components/ui/heading";

import { AccountDetails } from "./AccountDetails";

export const metadata: Metadata = {
  title: "Account",
};

export default function Page() {
  return (
    <>
      <AdminBreadcrumbs links={[{ label: "Account" }]} />
      <header className="mb-6">
        <Heading>Account</Heading>
      </header>
      <AccountDetails />
    </>
  );
}
