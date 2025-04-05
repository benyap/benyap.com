"use client";

import { use } from "react";
import { EllipsisVerticalIcon } from "lucide-react";

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
import { Heading } from "~/components/core/Heading";
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
          <Heading>
            <div className="space-y-2">
              <Text as="h1" style="heading" className="flex items-center">
                {loading ? <SkeletonText className="w-40" /> : camera?.name}
              </Text>
              {loading ? (
                <Text style="body">
                  <SkeletonText className="w-60" />
                </Text>
              ) : (
                camera?.description && (
                  <Text
                    style="body"
                    className="text-muted-foreground flex items-center whitespace-pre-wrap"
                  >
                    {camera?.description}
                  </Text>
                )
              )}
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
          </Heading>
          {camera && <EditCamera.Dialog cameraId={cameraId} camera={camera} />}
          {camera && (
            <DeleteCamera.Dialog cameraId={cameraId} camera={camera} />
          )}
        </DialogStoreProvider>

        {camera && (
          <>
            <div className="space-y-6">
              <section className="space-y-2">
                <Text as="h2" style="subheading">
                  Exif tag matches
                </Text>
                <Text style="muted">
                  These tags are used to match a photo&apos;s Exif{" "}
                  <code>Camera</code> tag to this camera when importing photos.
                </Text>
                <ul className="ml-6">
                  {camera.exifTagMatches.map((match) => (
                    <Text
                      as="li"
                      style="body"
                      key={match}
                      className="list-disc"
                    >
                      <code>{match}</code>
                    </Text>
                  ))}
                </ul>
                {!loading && camera.exifTagMatches.length === 0 && (
                  <Text style="muted">(no tags listed)</Text>
                )}
              </section>
              <section className="space-y-2">
                <Text as="h2" style="subheading">
                  Photos taken by this camera
                </Text>
                <Text style="muted">WIP</Text>
              </section>
            </div>
          </>
        )}
      </HideIfError>
    </>
  );
}
