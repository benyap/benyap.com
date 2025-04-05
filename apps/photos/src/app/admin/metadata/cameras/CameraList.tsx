"use client";

import { ImageIcon } from "lucide-react";
import Link from "next/link";

import { AdminRoute } from "~/constants/routes";
import { Camera, getCameras } from "~/core/camera";

import { useSnapshot } from "~/hooks/use-snapshot";
import { Text } from "~/components/ui/text";
import { SkeletonText } from "~/components/ui/skeleton";
import { Subheading } from "~/components/ui/heading";
import { HideIfError } from "~/components/core/HideIfError";

export function CameraList() {
  const [loading, snapshot, error] = useSnapshot(getCameras());

  return (
    <HideIfError errorTitle="Could not list cameras" error={error}>
      <div className="@container/camera-list">
        <div className="@min-lg/camera-list:grid-cols-2 @min-4xl/camera-list:grid-cols-3 grid grid-cols-1 gap-2">
          {loading && (
            <>
              <CameraCardPlaceholder />
              <CameraCardPlaceholder />
              <CameraCardPlaceholder />
            </>
          )}
          {snapshot?.docs.map((doc) => {
            const cameraId = doc.id;
            const camera = doc.data();
            return (
              <CameraCard key={cameraId} cameraId={cameraId} camera={camera} />
            );
          })}
        </div>
      </div>
    </HideIfError>
  );
}

function CameraCard(props: { cameraId: string; camera: Camera }) {
  const { cameraId, camera } = props;
  return (
    <Link
      href={AdminRoute.metadata.cameras.camera(cameraId)}
      className="hover:bg-accent focus-visible:border-ring focus-visible:ring-ring/50 dark:hover:bg-input/50 dark:border-input space-y-1 rounded-md border p-3 outline-none transition-all focus-visible:ring-[3px]"
    >
      <Subheading className="font-medium">{camera.name}</Subheading>
      <div className="flex gap-4">
        <Text className="flex items-center gap-1">
          <ImageIcon className="size-4" /> (unknown)
        </Text>
      </div>
    </Link>
  );
}

function CameraCardPlaceholder() {
  return (
    <div className="space-y-1 rounded-md border p-3">
      <Text className="font-medium">
        <SkeletonText className="w-40" />
      </Text>
      <div className="flex gap-4">
        <Text className="flex items-center gap-1">
          <ImageIcon className="size-4" /> <SkeletonText className="w-8" />
        </Text>
      </div>
    </div>
  );
}
