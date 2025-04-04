"use client";

import { createContext } from "react";
import { toast } from "sonner";

import { Camera, updateCamera } from "~/core/camera";
import { DialogStoreApi } from "~/stores/dialog";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import { CameraForm } from "~/components/admin/CameraForm";
import { DropdownMenuItem } from "~/components/ui/dropdown-menu";
import { useDialogStore } from "~/components/ui/dialog-store-provider";

export function EditCamera() {}

EditCamera.Context = createContext<DialogStoreApi | null>(null);

EditCamera.Trigger = function EditCameraTrigger() {
  const { setOpen } = useDialogStore(EditCamera.Context);
  return (
    <DropdownMenuItem onClick={() => setOpen(true)}>
      Edit camera
    </DropdownMenuItem>
  );
};

EditCamera.Dialog = function EditCameraDialog(props: {
  cameraId: string;
  camera: Camera;
}) {
  const { cameraId, camera } = props;

  const { open, setOpen } = useDialogStore(EditCamera.Context);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit camera</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
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
      </DialogContent>
    </Dialog>
  );
};
