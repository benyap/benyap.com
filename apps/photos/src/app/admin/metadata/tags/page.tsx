import { Metadata } from "next";

import { Heading } from "~/components/ui/heading";
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
      <header className="@min-lg:flex-row mb-6 flex flex-col justify-between gap-4">
        <Heading>Tags</Heading>
        <AddTag />
      </header>
      <TagsList />
    </>
  );
}
