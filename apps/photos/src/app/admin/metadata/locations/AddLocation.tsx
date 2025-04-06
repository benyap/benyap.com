"use client";

import { useState } from "react";
import { PlusIcon } from "lucide-react";
import { toast } from "sonner";

import { createLocation } from "~/core/location";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { Button } from "~/components/ui/button";
import { LocationForm } from "~/components/admin/LocationForm";

export function AddLocation() {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="@min-lg:w-auto w-full">
          <PlusIcon />
          Add location
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a location</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <LocationForm
          onSave={(location) =>
            createLocation(location)
              .andTee((ref) =>
                toast(`Created location ${location.name}`, {
                  description: `Location ID: ${ref.id}`,
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
