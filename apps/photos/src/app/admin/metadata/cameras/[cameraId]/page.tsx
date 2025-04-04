"use client";

import { use, useMemo } from "react";
import { AlertCircle, EllipsisVerticalIcon } from "lucide-react";

import { getCamera } from "~/core/camera";
import { useSnapshot } from "~/hooks/use-snapshot";

import { Heading } from "~/components/core/Heading";
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
    <div>
      <DialogStoreProvider
        contexts={[EditCamera.Context, DeleteCamera.Context]}
      >
        <Heading>
          <Text as="h1" style="heading" className="flex items-center">
            {camera?.name ?? <SkeletonText className="w-3xs" />}
          </Text>
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
    </div>
  );
}
