import { AdminBreadcrumbs } from "~/components/core/Breadcrumbs";
import { PageHeader } from "~/components/core/PageHeader";
import { MetadataCardList } from "~/components/metadata/MetadataCardList";
import { Heading } from "~/components/ui/heading";

export default function Loading() {
  return (
    <>
      <AdminBreadcrumbs links={[{ label: "Tags" }]} />
      <PageHeader>
        <Heading>Tags</Heading>
      </PageHeader>
      <MetadataCardList showPlaceholders />
    </>
  );
}
