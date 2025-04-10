"use client";

import { createContext } from "react";
import { toast } from "sonner";

import { Camera, updateCamera } from "~/core/camera";
import { DialogStoreApi } from "~/stores/dialog";

import { CameraForm } from "~/components/admin/CameraForm";
import { useDialogStore } from "~/components/ui/dialog-store-provider";
import { MenuTriggeredDialog } from "~/components/core/MenuTriggeredDialog";

EditCameraDialog.Context = createContext<DialogStoreApi | null>(null);

EditCameraDialog.Trigger = function EditCameraDialogTrigger() {
  return (
    <MenuTriggeredDialog.Trigger context={EditCameraDialog.Context}>
      Edit camera
    </MenuTriggeredDialog.Trigger>
  );
};

export function EditCameraDialog(props: { cameraId: string; camera: Camera }) {
  const { cameraId, camera } = props;

  const { setOpen } = useDialogStore(EditCameraDialog.Context);

  return (
    <MenuTriggeredDialog title="Edit camera" context={EditCameraDialog.Context}>
      <CameraForm
        camera={camera}
        onSave={(camera) =>
          updateCamera(cameraId, camera)
            .andTee(() =>
              toast(`Updated camera ${camera.name}`, { dismissible: true }),
            )
            .andTee(() => setOpen(false))
        }
      />
    </MenuTriggeredDialog>
  );
}
