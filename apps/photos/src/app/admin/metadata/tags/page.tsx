import { Metadata } from "next";

import { Heading } from "~/components/ui/heading";
import { PageHeader } from "~/components/core/PageHeader";
import { AdminBreadcrumbs } from "~/components/core/Breadcrumbs";

import { AddTag } from "./AddTag";
import { TagsList } from "./TagsList";

export const metadata: Metadata = {
  title: "Tags",
};

export default function Page() {
  return (
    <>
      <AdminBreadcrumbs links={[{ label: "Tags" }]} />
      <PageHeader className="@min-lg:flex-row flex-col">
        <Heading>Tags</Heading>
        <AddTag />
      </PageHeader>
      <TagsList />
    </>
  );
}
