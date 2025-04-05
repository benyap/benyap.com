"use client";

import { use } from "react";
import { EllipsisVerticalIcon } from "lucide-react";

import { AdminRoute } from "~/constants/routes";
import { getCamera } from "~/core/camera";
import { useSnapshot } from "~/hooks/use-snapshot";

import { SkeletonText } from "~/components/ui/skeleton";
import { Code } from "~/components/ui/text";
import { Button } from "~/components/ui/button";
import { Heading } from "~/components/ui/heading";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import {
  DescriptionDetails,
  DescriptionList,
  DescriptionTerm,
} from "~/components/ui/description-list";
import { DialogStoreProvider } from "~/components/ui/dialog-store-provider";
import { AdminBreadcrumbs } from "~/components/core/Breadcrumbs";
import { HideIfError } from "~/components/core/HideIfError";
import { NotFoundMessage } from "~/components/core/NotFoundMessage";

import { EditCamera } from "./EditCamera";
import { DeleteCamera } from "./DeleteCamera";

export default function Page(props: { params: Promise<{ cameraId: string }> }) {
  const { cameraId } = use(props.params);

  const [loading, snapshot, error, notFound] = useSnapshot(getCamera(cameraId));

  const camera = snapshot?.data();

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
          contexts={[EditCamera.Context, DeleteCamera.Context]}
        >
          <header className="mb-6 flex justify-between gap-4">
            <div className="space-y-2">
              <Heading className="flex items-center">
                {loading ? <SkeletonText className="w-40" /> : camera?.name}
              </Heading>
            </div>
            <DropdownMenu>
              {camera && (
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon">
                    <EllipsisVerticalIcon />
                  </Button>
                </DropdownMenuTrigger>
              )}
              <DropdownMenuContent className="mr-4 mt-1">
                <EditCamera.Trigger />
                <DeleteCamera.Trigger />
              </DropdownMenuContent>
            </DropdownMenu>
          </header>
          {camera && <EditCamera.Dialog cameraId={cameraId} camera={camera} />}
          {camera && (
            <DeleteCamera.Dialog cameraId={cameraId} camera={camera} />
          )}
        </DialogStoreProvider>

        {camera && (
          <>
            <DescriptionList>
              <DescriptionTerm>Camera ID</DescriptionTerm>
              <DescriptionDetails>
                <code>{cameraId}</code>
              </DescriptionDetails>

              <DescriptionTerm>Description</DescriptionTerm>
              <DescriptionDetails>{camera.description}</DescriptionDetails>

              <DescriptionTerm>Exif tag matches</DescriptionTerm>
              <DescriptionDetails>
                <ul className="ml-6">
                  {camera.exifTagMatches.map((match) => (
                    <li key={match} className="list-disc">
                      <Code>{match}</Code>
                    </li>
                  ))}
                </ul>
              </DescriptionDetails>

              <DescriptionTerm>Photos taken by this camera</DescriptionTerm>
              <DescriptionDetails>(TODO)</DescriptionDetails>
            </DescriptionList>
          </>
        )}
      </HideIfError>
    </>
  );
}
