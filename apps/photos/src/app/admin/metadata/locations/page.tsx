import { Metadata } from "next";

import { Heading } from "~/components/ui/heading";
import { AdminBreadcrumbs } from "~/components/core/Breadcrumbs";

import { AddLocation } from "./AddLocation";
import { LocationList } from "./LocationList";

export const metadata: Metadata = {
  title: "Locations",
};

export default function Page() {
  return (
    <>
      <AdminBreadcrumbs links={[{ label: "Locations" }]} />
      <header className="@min-lg:flex-row mb-6 flex flex-col justify-between gap-4">
        <Heading>Locations</Heading>
        <AddLocation />
      </header>
      <LocationList />
    </>
  );
}
