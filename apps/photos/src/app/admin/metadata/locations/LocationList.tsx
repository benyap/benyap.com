"use client";

import { MapPinIcon } from "lucide-react";

import { AdminRoute } from "~/constants/routes";
import { getLocations } from "~/core/location";

import { useSnapshot } from "~/hooks/use-snapshot";
import { Text } from "~/components/ui/text";
import { HideIfError } from "~/components/core/HideIfError";
import { MetadataCard } from "~/components/admin/MetadataCard";

export function LocationList() {
  const [loading, snapshot, error] = useSnapshot(getLocations());

  return (
    <HideIfError errorTitle="Could not list locations" error={error}>
      <div className="@container">
        {!loading && snapshot?.empty && (
          <Text color="secondary">
            No locations found. Create one to get started.
          </Text>
        )}
        <div className="@min-lg:grid-cols-2 @min-4xl:grid-cols-3 @min-7xl:grid-cols-4 grid grid-cols-1 gap-2">
          {loading && (
            <>
              <MetadataCard.Placeholder />
              <MetadataCard.Placeholder />
              <MetadataCard.Placeholder />
            </>
          )}
          {!loading &&
            snapshot?.docs.map((doc) => {
              const locationId = doc.id;
              const location = doc.data();
              return (
                <MetadataCard
                  key={locationId}
                  href={AdminRoute.metadata.locations.location(locationId)}
                  title={location.name}
                >
                  <MapPinIcon className="size-5 sm:size-4" />
                  <span className="capitalize">{location.type}</span>
                </MetadataCard>
              );
            })}
        </div>
      </div>
    </HideIfError>
  );
}
