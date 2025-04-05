"use client";

import { use, useMemo } from "react";
import { AlertCircle, EllipsisVerticalIcon } from "lucide-react";

import { AdminRoute } from "~/constants/routes";
import { getCamera } from "~/core/camera";
import { useSnapshot } from "~/hooks/use-snapshot";

import { SkeletonText } from "~/components/ui/skeleton";
import { Text } from "~/components/ui/typography";
import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { DialogStoreProvider } from "~/components/ui/dialog-store-provider";
import { Alert, AlertTitle } from "~/components/ui/alert";
import { Heading } from "~/components/core/Heading";
import { AdminBreadcrumbs } from "~/components/core/Breadcrumbs";

import { EditCamera } from "./EditCamera";
import { DeleteCamera } from "./DeleteCamera";

export default function Page(props: { params: Promise<{ cameraId: string }> }) {
  const { cameraId } = use(props.params);

  const [loading, snapshot] = useSnapshot(getCamera(cameraId));

  const notFound = useMemo(() => {
    return !loading && !snapshot?.exists();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  if (notFound) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Camera not found</AlertTitle>
      </Alert>
    );
  }

  const camera = snapshot?.data();

  return (
    <>
      <AdminBreadcrumbs
        links={[
          { href: AdminRoute.metadata.cameras.index, label: "Cameras" },
          { label: camera?.name, loading },
        ]}
      />
      <DialogStoreProvider
        contexts={[EditCamera.Context, DeleteCamera.Context]}
      >
        <Heading>
          <div className="space-y-2">
            <Text as="h1" style="heading" className="flex items-center">
              {loading ? <SkeletonText className="w-40" /> : camera?.name}
            </Text>
            <Text
              style="muted"
              className="flex items-center whitespace-pre-wrap"
            >
              {loading ? (
                <SkeletonText className="w-60" />
              ) : (
                camera?.description
              )}
            </Text>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <EllipsisVerticalIcon />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="mr-4 mt-1">
              <EditCamera.Trigger />
              <DeleteCamera.Trigger />
            </DropdownMenuContent>
          </DropdownMenu>
        </Heading>
        {camera && <EditCamera.Dialog cameraId={cameraId} camera={camera} />}
        {camera && <DeleteCamera.Dialog cameraId={cameraId} camera={camera} />}
      </DialogStoreProvider>
    </>
  );
}
