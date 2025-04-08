"use client";

import { CameraIcon } from "lucide-react";

import { AdminRoute } from "~/constants/routes";
import { getCameras } from "~/core/camera";

import { useSnapshot } from "~/hooks/use-snapshot";
import { Text } from "~/components/ui/text";
import { HideIfError } from "~/components/core/HideIfError";
import { MetadataCard } from "~/components/metadata/MetadataCard";
import { MetadataCardList } from "~/components/metadata/MetadataCardList";

export function CameraList() {
  const [loading, snapshot, error] = useSnapshot(getCameras());

  return (
    <HideIfError errorTitle="Could not list cameras" error={error}>
      <div className="@container">
        {!loading && snapshot?.empty && (
          <Text color="secondary">
            No cameras found. Create one to get started.
          </Text>
        )}
        <MetadataCardList showPlaceholders={loading}>
          {snapshot?.docs.map((doc) => {
            const cameraId = doc.id;
            const camera = doc.data();
            return (
              <MetadataCard
                key={cameraId}
                href={AdminRoute.metadata.cameras.camera(cameraId)}
                title={camera.name}
              >
                <CameraIcon className="size-5 sm:size-4" />
                Camera
              </MetadataCard>
            );
          })}
        </MetadataCardList>
      </div>
    </HideIfError>
  );
}
