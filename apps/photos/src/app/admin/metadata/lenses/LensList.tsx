"use client";

import { ApertureIcon } from "lucide-react";

import { AdminRoute } from "~/constants/routes";

import { Text } from "~/components/ui/text";
import { HideIfError } from "~/components/core/HideIfError";
import { useMetadata } from "~/components/metadata/MetadataProvider";
import { MetadataCard } from "~/components/metadata/MetadataCard";
import { MetadataCardList } from "~/components/metadata/MetadataCardList";

export function LensList() {
  const [loading, snapshot, error] = useMetadata().lenses;

  return (
    <HideIfError errorTitle="Could not list lenses" error={error}>
      <div className="@container">
        {!loading && snapshot?.empty && (
          <Text color="secondary">
            No lenses found. Create one to get started.
          </Text>
        )}
        <MetadataCardList showPlaceholders={loading}>
          {!loading &&
            snapshot?.docs.map((doc) => {
              const lensId = doc.id;
              const lens = doc.data();
              return (
                <MetadataCard
                  key={lensId}
                  href={AdminRoute.metadata.lenses.lens(lensId)}
                  title={lens.name}
                >
                  <ApertureIcon className="size-5 sm:size-4" />
                  Lens
                </MetadataCard>
              );
            })}
        </MetadataCardList>
      </div>
    </HideIfError>
  );
}
