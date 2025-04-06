"use client";

import { ApertureIcon } from "lucide-react";

import { AdminRoute } from "~/constants/routes";
import { getLenses } from "~/core/lens";

import { useSnapshot } from "~/hooks/use-snapshot";
import { Text } from "~/components/ui/text";
import { HideIfError } from "~/components/core/HideIfError";
import { MetadataCard } from "~/components/admin/MetadataCard";

export function LensList() {
  const [loading, snapshot, error] = useSnapshot(getLenses());

  return (
    <HideIfError errorTitle="Could not list lenses" error={error}>
      <div className="@container">
        {!loading && snapshot?.empty && (
          <Text color="secondary">
            No lenses found. Create one to get started.
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
        </div>
      </div>
    </HideIfError>
  );
}
