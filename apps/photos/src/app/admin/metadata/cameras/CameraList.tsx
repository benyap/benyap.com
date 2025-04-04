"use client";

import { ImageIcon } from "lucide-react";
import Link from "next/link";

import { AdminRoute } from "~/constants/routes";
import { Text } from "~/components/ui/typography";
import { Camera, getCameras } from "~/core/camera";
import { useSnapshot } from "~/hooks/use-snapshot";

export function CameraList() {
  const [, snapshot] = useSnapshot(getCameras());

  return (
    <div className="@container/camera-list">
      <div className="@min-lg/camera-list:grid-cols-2 @min-4xl/camera-list:grid-cols-3 grid grid-cols-1 gap-2">
        {snapshot?.docs.map((doc) => {
          const cameraId = doc.id;
          const camera = doc.data();
          return (
            <CameraCard key={cameraId} cameraId={cameraId} camera={camera} />
          );
        })}
      </div>
    </div>
  );
}

function CameraCard(props: { cameraId: string; camera: Camera }) {
  const { cameraId, camera } = props;
  return (
    <Link
      href={AdminRoute.metadata.cameras.camera(cameraId)}
      className="space-y-1 rounded-md border p-3 hover:bg-slate-50"
    >
      <Text style="body" className="font-medium">
        {camera.name}
      </Text>
      <div className="flex gap-4">
        <Text style="muted" className="flex items-center gap-1">
          <ImageIcon className="size-4" /> (unknown)
        </Text>
      </div>
    </Link>
  );
}
