import { TagIcon } from "lucide-react";

import { AdminBreadcrumbs } from "~/components/core/Breadcrumbs";
import { PageHeader } from "~/components/core/PageHeader";
import { Heading } from "~/components/ui/heading";
import { SkeletonText } from "~/components/ui/skeleton";

export default function Loading() {
  return (
    <>
      <AdminBreadcrumbs links={[{ label: "Tags" }, { loading: true }]} />
      <PageHeader>
        <Heading>
          <TagIcon className="text-muted-foreground mb-1 mr-2 inline" />
          <SkeletonText className="w-40" />
        </Heading>
      </PageHeader>
    </>
  );
}
