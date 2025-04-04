"use client";

import { useRouter } from "next/navigation";
import { createContext } from "react";
import { toast } from "sonner";

import { AdminRoute } from "~/constants/routes";
import { Camera, deleteCamera } from "~/core/camera";
import { DialogStoreApi } from "~/stores/dialog";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import { DeleteCameraForm } from "~/components/admin/CameraForm";
import { DropdownMenuItem } from "~/components/ui/dropdown-menu";
import { useDialogStore } from "~/components/ui/dialog-store-provider";

export function DeleteCamera() {}

DeleteCamera.Context = createContext<DialogStoreApi | null>(null);

DeleteCamera.Trigger = function DeleteCameraTrigger() {
  const { setOpen } = useDialogStore(DeleteCamera.Context);
  return (
    <DropdownMenuItem onClick={() => setOpen(true)}>
      Delete camera
    </DropdownMenuItem>
  );
};

DeleteCamera.Dialog = function EdiDeleteCameraDialog(props: {
  cameraId: string;
  camera: Camera;
}) {
  const { cameraId, camera } = props;

  const { push } = useRouter();
  const { open, setOpen } = useDialogStore(DeleteCamera.Context);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete camera</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this camera?
          </DialogDescription>
        </DialogHeader>
        <DeleteCameraForm
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
      </DialogContent>
    </Dialog>
  );
};
