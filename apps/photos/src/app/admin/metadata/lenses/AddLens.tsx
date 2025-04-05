"use client";

import { useState } from "react";
import { PlusIcon } from "lucide-react";
import { toast } from "sonner";

import { createLens } from "~/core/lens";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { Button } from "~/components/ui/button";
import { LensForm } from "~/components/admin/LensForm";

export function AddLens() {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="@min-lg:w-auto w-full">
          <PlusIcon />
          Add lens
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a lens</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <LensForm
          onSave={(lens) =>
            createLens(lens)
              .andTee((ref) =>
                toast(`Created lens ${lens.name}`, {
                  description: `Lens ID: ${ref.id}`,
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
