import { Metadata } from "next";

import { Heading } from "~/components/ui/heading";
import { PageHeader } from "~/components/core/PageHeader";
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
      <PageHeader className="@min-lg:flex-row flex-col">
        <Heading>Locations</Heading>
        <AddLocation />
      </PageHeader>
      <LocationList />
    </>
  );
}
