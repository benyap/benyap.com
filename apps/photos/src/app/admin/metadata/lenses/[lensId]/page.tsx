"use client";

import { use } from "react";
import { ApertureIcon, EllipsisVerticalIcon } from "lucide-react";

import { AdminRoute } from "~/constants/routes";
import { getLens } from "~/core/lens";
import { useSnapshot } from "~/hooks/use-snapshot";
import { useDocumentTitle } from "~/hooks/use-document-title";

import { SkeletonText } from "~/components/ui/skeleton";
import { Button } from "~/components/ui/button";
import { Heading } from "~/components/ui/heading";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { DialogStoreProvider } from "~/components/ui/dialog-store-provider";
import { AdminBreadcrumbs } from "~/components/core/Breadcrumbs";
import { HideIfError } from "~/components/core/HideIfError";
import { NotFoundMessage } from "~/components/core/NotFoundMessage";

import { EditLensDialog } from "./EditLens";
import { DeleteLensDialog } from "./DeleteLens";
import { LensDetails } from "./LensDetails";

export default function Page(props: { params: Promise<{ lensId: string }> }) {
  const { lensId } = use(props.params);

  const [loading, snapshot, error, notFound] = useSnapshot(getLens(lensId));

  const lens = snapshot?.data();

  useDocumentTitle(lens?.name);

  return (
    <>
      <AdminBreadcrumbs
        links={[
          { href: AdminRoute.metadata.lenses.index, label: "Lenses" },
          { label: lens?.name, loading: loading && !error },
        ]}
      />

      <HideIfError errorTitle={`Could not get lens ${lensId}`} error={error}>
        {notFound && <NotFoundMessage title="Lens not found" />}

        <DialogStoreProvider
          contexts={[EditLensDialog.Context, DeleteLensDialog.Context]}
        >
          <header className="mb-6 flex items-center justify-between gap-4">
            <div className="space-y-2">
              <Heading className="flex items-center gap-2">
                <ApertureIcon className="text-muted-foreground" />
                {loading ? <SkeletonText className="w-40" /> : lens?.name}
              </Heading>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild disabled={!lens}>
                <Button variant="outline" size="icon">
                  <EllipsisVerticalIcon />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="mr-4 mt-1">
                <EditLensDialog.Trigger />
                <DeleteLensDialog.Trigger />
              </DropdownMenuContent>
            </DropdownMenu>
          </header>
          {lens && <EditLensDialog lensId={lensId} lens={lens} />}
          {lens && <DeleteLensDialog lensId={lensId} lens={lens} />}
        </DialogStoreProvider>

        {lens && <LensDetails lensId={lensId} lens={lens} />}
      </HideIfError>
    </>
  );
}
