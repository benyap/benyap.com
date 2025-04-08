import { Metadata } from "next";

import { Heading } from "~/components/ui/heading";
import { PageHeader } from "~/components/core/PageHeader";
import { AdminBreadcrumbs } from "~/components/core/Breadcrumbs";

import { AddPhotos } from "./AddPhotos";

export const metadata: Metadata = {
  title: "Photos",
};

export default function Page() {
  return (
    <>
      <AdminBreadcrumbs links={[{ label: "Photos" }]} />
      <PageHeader className="@min-lg:flex-row flex-col">
        <Heading>Photos</Heading>
        <AddPhotos />
      </PageHeader>
    </>
  );
}
