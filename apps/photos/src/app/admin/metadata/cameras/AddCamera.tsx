"use client";

import { useState } from "react";
import { PlusIcon } from "lucide-react";
import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { Button } from "~/components/ui/button";
import { CameraForm } from "~/components/admin/CameraForm";

import { createCamera } from "~/core/camera";

export function AddCamera() {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="@min-lg:w-auto w-full">
          <PlusIcon />
          Add camera
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a camera</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <CameraForm
          onSave={(camera) =>
            createCamera(camera)
              .andTee((ref) =>
                toast(`Created camera ${camera.name}`, {
                  description: `Camera ID: ${ref.id}`,
                  dismissible: true,
                }),
              )
              .andTee(() => setOpen(false))
          }
        />
      </DialogContent>
    </Dialog>
  );
}
