import { MapPinIcon } from "lucide-react";

import { AdminBreadcrumbs } from "~/components/core/Breadcrumbs";
import { PageHeader } from "~/components/core/PageHeader";
import { Heading } from "~/components/ui/heading";
import { SkeletonText } from "~/components/ui/skeleton";

export default function Loading() {
  return (
    <>
      <AdminBreadcrumbs links={[{ label: "Locations" }, { loading: true }]} />
      <PageHeader>
        <Heading>
          <MapPinIcon className="text-muted-foreground mb-1 mr-2 inline" />
          <SkeletonText className="w-40" />
        </Heading>
      </PageHeader>
    </>
  );
}
