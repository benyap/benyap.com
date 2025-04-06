"use client";

import { ImageIcon } from "lucide-react";

import { AdminRoute } from "~/constants/routes";
import { Camera, getCameras } from "~/core/camera";

import { useSnapshot } from "~/hooks/use-snapshot";
import { Text } from "~/components/ui/text";
import { SkeletonText } from "~/components/ui/skeleton";
import { HideIfError } from "~/components/core/HideIfError";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  LinkCard,
} from "~/components/ui/card";

export function CameraList() {
  const [loading, snapshot, error] = useSnapshot(getCameras());

  return (
    <HideIfError errorTitle="Could not list cameras" error={error}>
      <div className="@container">
        <div className="@min-lg:grid-cols-2 @min-4xl:grid-cols-3 @min-7xl:grid-cols-4 grid grid-cols-1 gap-2">
          {loading && (
            <>
              <CameraCardPlaceholder />
              <CameraCardPlaceholder />
              <CameraCardPlaceholder />
            </>
          )}
          {!loading && snapshot?.empty && (
            <Text color="secondary">
              No cameras found. Create one to get started.
            </Text>
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
    <LinkCard dense href={AdminRoute.metadata.cameras.camera(cameraId)}>
      <CardHeader>
        <CardTitle className="truncate">{camera.name}</CardTitle>
        <CardDescription className="flex items-center gap-1">
          <ImageIcon className="size-5 sm:size-4" /> (unknown)
        </CardDescription>
      </CardHeader>
    </LinkCard>
  );
}

function CameraCardPlaceholder() {
  return (
    <Card dense>
      <CardHeader>
        <CardTitle>
          <SkeletonText className="w-40" />
        </CardTitle>
        <CardDescription className="flex items-center gap-1">
          <ImageIcon className="size-5 sm:size-4" />
          <SkeletonText className="w-8" />
        </CardDescription>
      </CardHeader>
    </Card>
  );
}
