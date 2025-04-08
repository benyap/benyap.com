"use client";

import { createContext } from "react";
import { toast } from "sonner";

import { Tag, updateTag } from "~/core/tag";
import { DialogStoreApi } from "~/stores/dialog";

import { TagForm } from "~/components/metadata/TagForm";
import { useDialogStore } from "~/components/ui/dialog-store-provider";
import { MenuTriggeredDialog } from "~/components/core/MenuTriggeredDialog";

EditTagDialog.Context = createContext<DialogStoreApi | null>(null);

EditTagDialog.Trigger = function EditCameraDialogTrigger() {
  return (
    <MenuTriggeredDialog.Trigger context={EditTagDialog.Context}>
      Edit tag
    </MenuTriggeredDialog.Trigger>
  );
};

export function EditTagDialog(props: { tagId: string; tag: Tag }) {
  const { tagId, tag } = props;

  const { setOpen } = useDialogStore(EditTagDialog.Context);

  return (
    <MenuTriggeredDialog title="Edit tag" context={EditTagDialog.Context}>
      <TagForm
        tag={tag}
        onSave={(tag) =>
          updateTag(tagId, tag)
            .andTee(() =>
              toast(`Updated tag ${tag.name}`, { dismissible: true }),
            )
            .andTee(() => setOpen(false))
        }
      />
    </MenuTriggeredDialog>
  );
}
