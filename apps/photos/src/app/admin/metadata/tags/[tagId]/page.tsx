"use client";

import { use } from "react";
import { EllipsisVerticalIcon, TagIcon } from "lucide-react";

import { AdminRoute } from "~/constants/routes";
import { getTag } from "~/core/tag";
import { useSnapshot } from "~/hooks/use-snapshot";

import { SkeletonText } from "~/components/ui/skeleton";
import { Button } from "~/components/ui/button";
import { Heading } from "~/components/ui/heading";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { DialogStoreProvider } from "~/components/core/DialogStoreProvider";
import { AdminBreadcrumbs } from "~/components/core/Breadcrumbs";
import { HideIfError } from "~/components/core/HideIfError";
import { NotFoundMessage } from "~/components/core/NotFoundMessage";
import { PageHeader } from "~/components/core/PageHeader";

import { EditTagDialog } from "./EditTag";
import { DeleteTagDialog } from "./DeleteTag";
import { TagDetails } from "./TagDetails";

export default function Page(props: { params: Promise<{ tagId: string }> }) {
  const { tagId } = use(props.params);

  const [loading, snapshot, error, notFound] = useSnapshot(getTag(tagId));

  const tag = snapshot?.data();

  return (
    <>
      <AdminBreadcrumbs
        links={[
          { href: AdminRoute.metadata.tags.index, label: "Tags" },
          { label: tag?.name, loading: loading && !error },
        ]}
      />

      <HideIfError errorTitle={`Could not get camera ${tagId}`} error={error}>
        {notFound && <NotFoundMessage title="Camera not found" />}

        <DialogStoreProvider
          contexts={[EditTagDialog.Context, DeleteTagDialog.Context]}
        >
          <PageHeader>
            <Heading>
              <TagIcon className="text-muted-foreground mb-1 mr-2 inline" />
              {loading ? <SkeletonText className="w-40" /> : tag?.name}
            </Heading>
            <DropdownMenu>
              <DropdownMenuTrigger asChild disabled={!tag}>
                <Button variant="outline" size="icon">
                  <EllipsisVerticalIcon />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="mr-4 mt-1">
                <EditTagDialog.Trigger />
                <DeleteTagDialog.Trigger />
              </DropdownMenuContent>
            </DropdownMenu>
          </PageHeader>
          {tag && <EditTagDialog tagId={tagId} tag={tag} />}
          {tag && <DeleteTagDialog tagId={tagId} tag={tag} />}
        </DialogStoreProvider>

        {tag && <TagDetails tagId={tagId} tag={tag} />}
      </HideIfError>
    </>
  );
}
