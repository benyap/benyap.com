"use client";

import { use } from "react";
import { EllipsisVerticalIcon, MapPinIcon } from "lucide-react";

import { AdminRoute } from "~/constants/routes";
import { getLocation } from "~/core/location";
import { useSnapshot } from "~/hooks/use-snapshot";
import { useDocumentTitle } from "~/hooks/use-document-title";

import { SkeletonText } from "~/components/ui/skeleton";
import { Button } from "~/components/ui/button";
import { Heading } from "~/components/ui/heading";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { DialogStoreProvider } from "~/components/core/DialogStoreProvider";
import { AdminBreadcrumbs } from "~/components/core/Breadcrumbs";
import { HideIfError } from "~/components/core/HideIfError";
import { NotFoundMessage } from "~/components/core/NotFoundMessage";
import { PageHeader } from "~/components/core/PageHeader";

import { EditLocationDialog } from "./EditLocation";
import { DeleteLocationDialog } from "./DeleteLocation";
import { LocationDetails } from "./LocationDetails";

export default function Page(props: {
  params: Promise<{ locationId: string }>;
}) {
  const { locationId } = use(props.params);

  const [loading, snapshot, error, notFound] = useSnapshot(
    getLocation(locationId),
  );

  const location = snapshot?.data();

  useDocumentTitle(location?.name);

  return (
    <>
      <AdminBreadcrumbs
        links={[
          { href: AdminRoute.metadata.locations.index, label: "Locations" },
          { label: location?.name, loading: loading && !error },
        ]}
      />

      <HideIfError
        errorTitle={`Could not get location ${locationId}`}
        error={error}
      >
        {notFound && <NotFoundMessage title="Location not found" />}

        <DialogStoreProvider
          contexts={[EditLocationDialog.Context, DeleteLocationDialog.Context]}
        >
          <PageHeader>
            <Heading>
              <MapPinIcon className="text-muted-foreground mb-1 mr-2 inline" />
              {loading ? <SkeletonText className="w-40" /> : location?.name}
            </Heading>
            <DropdownMenu>
              <DropdownMenuTrigger asChild disabled={!location}>
                <Button variant="outline" size="icon">
                  <EllipsisVerticalIcon />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="mr-4 mt-1">
                <EditLocationDialog.Trigger />
                <DeleteLocationDialog.Trigger />
              </DropdownMenuContent>
            </DropdownMenu>
          </PageHeader>
          {location && (
            <EditLocationDialog locationId={locationId} location={location} />
          )}
          {location && (
            <DeleteLocationDialog locationId={locationId} location={location} />
          )}
        </DialogStoreProvider>

        {location && (
          <LocationDetails locationId={locationId} location={location} />
        )}
      </HideIfError>
    </>
  );
}
