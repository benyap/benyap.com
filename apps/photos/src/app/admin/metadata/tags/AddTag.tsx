"use client";

import { useState } from "react";
import { PlusIcon } from "lucide-react";
import { toast } from "sonner";

import { createTag } from "~/core/tag";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { Button } from "~/components/ui/button";
import { TagForm } from "~/components/admin/TagForm";

export function AddTag() {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="@min-lg:w-auto w-full">
          <PlusIcon />
          Add tag
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a tag</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <TagForm
          onSave={(tag) =>
            createTag(tag)
              .andTee((ref) =>
                toast(`Created tag ${tag.name}`, {
                  description: `Tag ID: ${ref.id}`,
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
