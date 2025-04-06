"use client";

import { use } from "react";
import { CameraIcon, EllipsisVerticalIcon } from "lucide-react";

import { AdminRoute } from "~/constants/routes";
import { getCamera } from "~/core/camera";
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

import { EditCameraDialog } from "./EditCamera";
import { DeleteCameraDialog } from "./DeleteCamera";
import { CameraDetails } from "./CameraDetails";

export default function Page(props: { params: Promise<{ cameraId: string }> }) {
  const { cameraId } = use(props.params);

  const [loading, snapshot, error, notFound] = useSnapshot(getCamera(cameraId));

  const camera = snapshot?.data();

  useDocumentTitle(camera?.name);

  return (
    <>
      <AdminBreadcrumbs
        links={[
          { href: AdminRoute.metadata.cameras.index, label: "Cameras" },
          { label: camera?.name, loading: loading && !error },
        ]}
      />

      <HideIfError
        errorTitle={`Could not get camera ${cameraId}`}
        error={error}
      >
        {notFound && <NotFoundMessage title="Camera not found" />}

        <DialogStoreProvider
          contexts={[EditCameraDialog.Context, DeleteCameraDialog.Context]}
        >
          <header className="mb-6 flex justify-between gap-4">
            <div className="space-y-2">
              <Heading className="flex items-center gap-2">
                <CameraIcon className="text-muted-foreground" />
                {loading ? <SkeletonText className="w-40" /> : camera?.name}
              </Heading>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild disabled={!camera}>
                <Button variant="outline" size="icon">
                  <EllipsisVerticalIcon />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="mr-4 mt-1">
                <EditCameraDialog.Trigger />
                <DeleteCameraDialog.Trigger />
              </DropdownMenuContent>
            </DropdownMenu>
          </header>
          {camera && <EditCameraDialog cameraId={cameraId} camera={camera} />}
          {camera && <DeleteCameraDialog cameraId={cameraId} camera={camera} />}
        </DialogStoreProvider>

        {camera && <CameraDetails cameraId={cameraId} camera={camera} />}
      </HideIfError>
    </>
  );
}
