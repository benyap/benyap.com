"use client";

import { createContext } from "react";
import { toast } from "sonner";

import { Lens, updateLens } from "~/core/lens";
import { DialogStoreApi } from "~/stores/dialog";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import { LensForm } from "~/components/admin/LensForm";
import { DropdownMenuItem } from "~/components/ui/dropdown-menu";
import { useDialogStore } from "~/components/ui/dialog-store-provider";

export function EditLens() {}

EditLens.Context = createContext<DialogStoreApi | null>(null);

EditLens.Trigger = function EditLensTrigger() {
  const { setOpen } = useDialogStore(EditLens.Context);
  return (
    <DropdownMenuItem onClick={() => setOpen(true)}>Edit lens</DropdownMenuItem>
  );
};

EditLens.Dialog = function EditLensDialog(props: {
  lensId: string;
  lens: Lens;
}) {
  const { lensId, lens } = props;

  const { open, setOpen } = useDialogStore(EditLens.Context);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit lens</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <LensForm
          lens={lens}
          onSave={(lens) =>
            updateLens(lensId, lens)
              .andTee(() =>
                toast(`Updated lens ${lens.name}`, { dismissible: true }),
              )
              .andTee(() => setOpen(false))
          }
        />
      </DialogContent>
    </Dialog>
  );
};
