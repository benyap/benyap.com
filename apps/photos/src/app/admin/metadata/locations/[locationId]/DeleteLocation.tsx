"use client";

import { useRouter } from "next/navigation";
import { createContext } from "react";
import { toast } from "sonner";

import { AdminRoute } from "~/constants/routes";
import { deleteLocation, Location } from "~/core/location";

import {
  useDialogStore,
  DialogStoreApi,
} from "~/components/core/DialogStoreProvider";
import { DeleteMetadataForm } from "~/components/metadata/DeleteMetadataForm";
import { MenuTriggeredDialog } from "~/components/core/MenuTriggeredDialog";

DeleteLocationDialog.Context = createContext<DialogStoreApi | null>(null);

DeleteLocationDialog.Trigger = function DeleteLocationTrigger() {
  return (
    <MenuTriggeredDialog.Trigger context={DeleteLocationDialog.Context}>
      Delete location
    </MenuTriggeredDialog.Trigger>
  );
};

export function DeleteLocationDialog(props: {
  locationId: string;
  location: Location;
}) {
  const { locationId, location } = props;

  const { push } = useRouter();
  const { setOpen } = useDialogStore(DeleteLocationDialog.Context);

  return (
    <MenuTriggeredDialog
      title="Delete location"
      description="Are you sure you want to delete this location?"
      context={DeleteLocationDialog.Context}
    >
      <DeleteMetadataForm
        onDelete={() =>
          deleteLocation(locationId, location)
            .andTee(() => setOpen(false))
            .andTee(() => push(AdminRoute.metadata.locations.index))
            .andTee(() =>
              toast(`Deleted location ${location.name}`, { dismissible: true }),
            )
        }
        onCancel={() => setOpen(false)}
      />
    </MenuTriggeredDialog>
  );
}
