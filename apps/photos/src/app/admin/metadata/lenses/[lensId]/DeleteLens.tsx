"use client";

import { useRouter } from "next/navigation";
import { createContext } from "react";
import { toast } from "sonner";

import { AdminRoute } from "~/constants/routes";
import { Lens, deleteLens } from "~/core/lens";
import { DialogStoreApi } from "~/stores/dialog";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import { DeleteLensForm } from "~/components/admin/LensForm";
import { DropdownMenuItem } from "~/components/ui/dropdown-menu";
import { useDialogStore } from "~/components/ui/dialog-store-provider";

export function DeleteLens() {}

DeleteLens.Context = createContext<DialogStoreApi | null>(null);

DeleteLens.Trigger = function DeleteLensTrigger() {
  const { setOpen } = useDialogStore(DeleteLens.Context);
  return (
    <DropdownMenuItem onClick={() => setOpen(true)}>
      Delete lens
    </DropdownMenuItem>
  );
};

DeleteLens.Dialog = function EdiDeleteLensDialog(props: {
  lensId: string;
  lens: Lens;
}) {
  const { lensId, lens } = props;

  const { push } = useRouter();
  const { open, setOpen } = useDialogStore(DeleteLens.Context);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete lens</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this lens?
          </DialogDescription>
        </DialogHeader>
        <DeleteLensForm
          onDelete={() =>
            deleteLens(lensId, lens)
              .andTee(() => setOpen(false))
              .andTee(() => push(AdminRoute.metadata.lenses.index))
              .andTee(() =>
                toast(`Deleted lens ${lens.name}`, { dismissible: true }),
              )
          }
          onCancel={() => setOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
};
