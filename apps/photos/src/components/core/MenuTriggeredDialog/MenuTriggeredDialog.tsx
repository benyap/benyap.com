"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import { DropdownMenuItem } from "~/components/ui/dropdown-menu";
import {
  useDialogStore,
  DialogStoreApi,
} from "~/components/core/DialogStoreProvider";

export function MenuTriggeredDialog(
  props: React.PropsWithChildren<{
    title: React.ReactNode;
    description?: React.ReactNode;
    context: React.Context<DialogStoreApi | null>;
  }>,
) {
  const { title, description, context, children } = props;

  const { open, setOpen } = useDialogStore(context);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
}

MenuTriggeredDialog.Trigger = function EditMetadataDialogTrigger(
  props: React.PropsWithChildren<{
    context: React.Context<DialogStoreApi | null>;
  }>,
) {
  const { context, children } = props;
  const { setOpen } = useDialogStore(context);
  return (
    <DropdownMenuItem onClick={() => setOpen(true)}>
      {children}
    </DropdownMenuItem>
  );
};
