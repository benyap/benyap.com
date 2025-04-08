import { AdminBreadcrumbs } from "~/components/core/Breadcrumbs";
import { PageHeader } from "~/components/core/PageHeader";
import { MetadataCardList } from "~/components/metadata/MetadataCardList";
import { Heading } from "~/components/ui/heading";

export default function Loading() {
  return (
    <>
      <AdminBreadcrumbs links={[{ label: "Lenses" }]} />
      <PageHeader>
        <Heading>Lenses</Heading>
      </PageHeader>
      <MetadataCardList showPlaceholders />
    </>
  );
}
