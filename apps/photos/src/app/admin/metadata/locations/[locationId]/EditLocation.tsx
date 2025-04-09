"use client";

import { createContext } from "react";
import { toast } from "sonner";

import { Location, updateLocation } from "~/core/location";

import {
  useDialogStore,
  DialogStoreApi,
} from "~/components/core/DialogStoreProvider";
import { LocationForm } from "~/components/metadata/LocationForm";
import { MenuTriggeredDialog } from "~/components/core/MenuTriggeredDialog";

EditLocationDialog.Context = createContext<DialogStoreApi | null>(null);

EditLocationDialog.Trigger = function EditLocationDialogTrigger() {
  return (
    <MenuTriggeredDialog.Trigger context={EditLocationDialog.Context}>
      Edit location
    </MenuTriggeredDialog.Trigger>
  );
};

export function EditLocationDialog(props: {
  locationId: string;
  location: Location;
}) {
  const { locationId, location } = props;

  const { setOpen } = useDialogStore(EditLocationDialog.Context);

  return (
    <MenuTriggeredDialog
      title="Edit location"
      context={EditLocationDialog.Context}
    >
      <LocationForm
        location={location}
        onSave={(location) =>
          updateLocation(locationId, location)
            .andTee(() =>
              toast(`Updated location ${location.name}`, { dismissible: true }),
            )
            .andTee(() => setOpen(false))
        }
      />
    </MenuTriggeredDialog>
  );
}
