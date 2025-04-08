import { Metadata } from "next";

import { Heading } from "~/components/ui/heading";
import { AdminBreadcrumbs } from "~/components/core/Breadcrumbs";

export const metadata: Metadata = {
  title: "Collections",
};

export default function Page() {
  return (
    <>
      <AdminBreadcrumbs links={[{ label: "Collections" }]} />
      <header className="@min-lg:flex-row mb-6 flex flex-col justify-between gap-4">
        <Heading>Collections</Heading>
      </header>
    </>
  );
}
