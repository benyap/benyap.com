import { Metadata } from "next";

import { Heading } from "~/components/ui/heading";
import { PageHeader } from "~/components/core/PageHeader";
import { AdminBreadcrumbs } from "~/components/core/Breadcrumbs";

import { AddLens } from "./AddLens";
import { LensList } from "./LensList";

export const metadata: Metadata = {
  title: "Lenses",
};

export default function Page() {
  return (
    <>
      <AdminBreadcrumbs links={[{ label: "Lenses" }]} />
      <PageHeader className="@min-lg:flex-row flex-col">
        <Heading>Lenses</Heading>
        <AddLens />
      </PageHeader>
      <LensList />
    </>
  );
}
