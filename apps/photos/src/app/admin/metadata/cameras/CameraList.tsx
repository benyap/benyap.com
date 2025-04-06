"use client";

import { AdminRoute } from "~/constants/routes";
import { getCameras } from "~/core/camera";

import { useSnapshot } from "~/hooks/use-snapshot";
import { Text } from "~/components/ui/text";
import { HideIfError } from "~/components/core/HideIfError";
import { MetadataCard } from "~/components/admin/MetadataCard";

export function CameraList() {
  const [loading, snapshot, error] = useSnapshot(getCameras());

  return (
    <HideIfError errorTitle="Could not list cameras" error={error}>
      <div className="@container">
        <div className="@min-lg:grid-cols-2 @min-4xl:grid-cols-3 @min-7xl:grid-cols-4 grid grid-cols-1 gap-2">
          {loading && (
            <>
              <MetadataCard.Placeholder />
              <MetadataCard.Placeholder />
              <MetadataCard.Placeholder />
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
              <MetadataCard
                key={cameraId}
                href={AdminRoute.metadata.cameras.camera(cameraId)}
                title={camera.name}
              />
            );
          })}
        </div>
      </div>
    </HideIfError>
  );
}
