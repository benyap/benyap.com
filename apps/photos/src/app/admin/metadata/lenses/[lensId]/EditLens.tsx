"use client";

import { createContext } from "react";
import { toast } from "sonner";

import { Lens, updateLens } from "~/core/lens";

import {
  useDialogStore,
  DialogStoreApi,
} from "~/components/core/DialogStoreProvider";
import { LensForm } from "~/components/metadata/LensForm";
import { MenuTriggeredDialog } from "~/components/core/MenuTriggeredDialog";

EditLensDialog.Context = createContext<DialogStoreApi | null>(null);

EditLensDialog.Trigger = function EditLensDialogTrigger() {
  return (
    <MenuTriggeredDialog.Trigger context={EditLensDialog.Context}>
      Edit lens
    </MenuTriggeredDialog.Trigger>
  );
};

export function EditLensDialog(props: { lensId: string; lens: Lens }) {
  const { lensId, lens } = props;

  const { setOpen } = useDialogStore(EditLensDialog.Context);

  return (
    <MenuTriggeredDialog title="Edit lens" context={EditLensDialog.Context}>
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
    </MenuTriggeredDialog>
  );
}
