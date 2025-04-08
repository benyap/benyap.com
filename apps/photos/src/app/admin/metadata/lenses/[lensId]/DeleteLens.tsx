"use client";

import { useRouter } from "next/navigation";
import { createContext } from "react";
import { toast } from "sonner";

import { AdminRoute } from "~/constants/routes";
import { Lens, deleteLens } from "~/core/lens";
import { DialogStoreApi } from "~/stores/dialog";

import { useDialogStore } from "~/components/ui/dialog-store-provider";
import { DeleteMetadataForm } from "~/components/metadata/DeleteMetadataForm";
import { MenuTriggeredDialog } from "~/components/core/MenuTriggeredDialog";

DeleteLensDialog.Context = createContext<DialogStoreApi | null>(null);

DeleteLensDialog.Trigger = function DeleteLensTrigger() {
  return (
    <MenuTriggeredDialog.Trigger context={DeleteLensDialog.Context}>
      Delete lens
    </MenuTriggeredDialog.Trigger>
  );
};

export function DeleteLensDialog(props: { lensId: string; lens: Lens }) {
  const { lensId, lens } = props;

  const { push } = useRouter();
  const { setOpen } = useDialogStore(DeleteLensDialog.Context);

  return (
    <MenuTriggeredDialog
      title="Delete lens"
      description="Are you sure you want to delete this lens?"
      context={DeleteLensDialog.Context}
    >
      <DeleteMetadataForm
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
    </MenuTriggeredDialog>
  );
}
