import { AdminBreadcrumbs } from "~/components/core/Breadcrumbs";
import { PageHeader } from "~/components/core/PageHeader";
import { Heading } from "~/components/ui/heading";

export default function Loading() {
  return (
    <>
      <AdminBreadcrumbs links={[{ label: "Photos" }]} />
      <PageHeader>
        <Heading>Photos</Heading>
      </PageHeader>
    </>
  );
}
