"use client";

import { AdminRoute } from "~/constants/routes";
import { getTags } from "~/core/tag";

import { useSnapshot } from "~/hooks/use-snapshot";
import { Text } from "~/components/ui/text";
import { HideIfError } from "~/components/core/HideIfError";
import { MetadataCard } from "~/components/admin/MetadataCard";

export function TagsList() {
  const [loading, snapshot, error] = useSnapshot(getTags());

  return (
    <HideIfError errorTitle="Could not list tags" error={error}>
      <div className="@container">
        <div className="@min-lg:grid-cols-2 @min-4xl:grid-cols-3 @min-7xl:grid-cols-4 grid grid-cols-1 gap-2">
          {loading && (
            <>
              <MetadataCard.Placeholder />
              <MetadataCard.Placeholder />
              <MetadataCard.Placeholder />
            </>
          )}
          {!loading && snapshot?.empty && (
            <Text color="secondary">
              No tags found. Create one to get started.
            </Text>
          )}
          {!loading &&
            snapshot?.docs.map((doc) => {
              const tagId = doc.id;
              const tag = doc.data();
              return (
                <MetadataCard
                  key={tagId}
                  href={AdminRoute.metadata.tags.tag(tagId)}
                  title={tag.name}
                />
              );
            })}
        </div>
      </div>
    </HideIfError>
  );
}
