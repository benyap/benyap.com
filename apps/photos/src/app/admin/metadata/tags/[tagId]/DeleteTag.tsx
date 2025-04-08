"use client";

import { useRouter } from "next/navigation";
import { createContext } from "react";
import { toast } from "sonner";

import { AdminRoute } from "~/constants/routes";
import { Tag, deleteTag } from "~/core/tag";
import { DialogStoreApi } from "~/stores/dialog";

import { useDialogStore } from "~/components/ui/dialog-store-provider";
import { DeleteMetadataForm } from "~/components/metadata/DeleteMetadataForm";
import { MenuTriggeredDialog } from "~/components/core/MenuTriggeredDialog";

DeleteTagDialog.Context = createContext<DialogStoreApi | null>(null);

DeleteTagDialog.Trigger = function DeleteTagTrigger() {
  return (
    <MenuTriggeredDialog.Trigger context={DeleteTagDialog.Context}>
      Delete tag
    </MenuTriggeredDialog.Trigger>
  );
};

export function DeleteTagDialog(props: { tagId: string; tag: Tag }) {
  const { tagId, tag } = props;

  const { push } = useRouter();
  const { setOpen } = useDialogStore(DeleteTagDialog.Context);

  return (
    <MenuTriggeredDialog
      title="Delete tag"
      description="Are you sure you want to delete this tag?"
      context={DeleteTagDialog.Context}
    >
      <DeleteMetadataForm
        onDelete={() =>
          deleteTag(tagId, tag)
            .andTee(() => setOpen(false))
            .andTee(() => push(AdminRoute.metadata.tags.index))
            .andTee(() =>
              toast(`Deleted tag ${tag.name}`, { dismissible: true }),
            )
        }
        onCancel={() => setOpen(false)}
      />
    </MenuTriggeredDialog>
  );
}
