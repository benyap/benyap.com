"use client";

import { MapPinIcon } from "lucide-react";

import { AdminRoute } from "~/constants/routes";

import { Text } from "~/components/ui/text";
import { HideIfError } from "~/components/core/HideIfError";
import { useMetadata } from "~/components/metadata/MetadataProvider";
import { MetadataCard } from "~/components/metadata/MetadataCard";
import { MetadataCardList } from "~/components/metadata/MetadataCardList";

export function LocationList() {
  const [loading, snapshot, error] = useMetadata().locations;

  return (
    <HideIfError errorTitle="Could not list locations" error={error}>
      <div className="@container">
        {!loading && snapshot?.empty && (
          <Text color="secondary">
            No locations found. Create one to get started.
          </Text>
        )}
        <MetadataCardList showPlaceholders={loading}>
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
        </MetadataCardList>
      </div>
    </HideIfError>
  );
}
