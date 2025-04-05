import { Metadata } from "next";

import { Heading } from "~/components/ui/heading";
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
      <header className="@min-lg:flex-row mb-6 flex flex-col justify-between gap-4">
        <Heading>Lenses</Heading>
        <AddLens />
      </header>
      <LensList />
    </>
  );
}
