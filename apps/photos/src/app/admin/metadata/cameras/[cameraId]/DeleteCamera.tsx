"use client";

import { useRouter } from "next/navigation";
import { createContext } from "react";
import { toast } from "sonner";

import { AdminRoute } from "~/constants/routes";
import { Camera, deleteCamera } from "~/core/camera";

import {
  useDialogStore,
  DialogStoreApi,
} from "~/components/core/DialogStoreProvider";
import { DeleteMetadataForm } from "~/components/metadata/DeleteMetadataForm";
import { MenuTriggeredDialog } from "~/components/core/MenuTriggeredDialog";

DeleteCameraDialog.Context = createContext<DialogStoreApi | null>(null);

DeleteCameraDialog.Trigger = function DeleteCameraTrigger() {
  return (
    <MenuTriggeredDialog.Trigger context={DeleteCameraDialog.Context}>
      Delete camera
    </MenuTriggeredDialog.Trigger>
  );
};

export function DeleteCameraDialog(props: {
  cameraId: string;
  camera: Camera;
}) {
  const { cameraId, camera } = props;

  const { push } = useRouter();
  const { setOpen } = useDialogStore(DeleteCameraDialog.Context);

  return (
    <MenuTriggeredDialog
      title="Delete camera"
      description="Are you sure you want to delete this camera?"
      context={DeleteCameraDialog.Context}
    >
      <DeleteMetadataForm
        onDelete={() =>
          deleteCamera(cameraId, camera)
            .andTee(() => setOpen(false))
            .andTee(() => push(AdminRoute.metadata.cameras.index))
            .andTee(() =>
              toast(`Deleted camera ${camera.name}`, { dismissible: true }),
            )
        }
        onCancel={() => setOpen(false)}
      />
    </MenuTriggeredDialog>
  );
}
