"use client";

import { TagIcon } from "lucide-react";

import { AdminRoute } from "~/constants/routes";

import { Text } from "~/components/ui/text";
import { HideIfError } from "~/components/core/HideIfError";
import { useMetadata } from "~/components/metadata/MetadataProvider";
import { MetadataCard } from "~/components/metadata/MetadataCard";
import { MetadataCardList } from "~/components/metadata/MetadataCardList";

export function TagsList() {
  const [loading, snapshot, error] = useMetadata().tags;

  return (
    <HideIfError errorTitle="Could not list tags" error={error}>
      <div className="@container">
        {!loading && snapshot?.empty && (
          <Text color="secondary">
            No tags found. Create one to get started.
          </Text>
        )}
        <MetadataCardList showPlaceholders={loading}>
          {!loading &&
            snapshot?.docs.map((doc) => {
              const tagId = doc.id;
              const tag = doc.data();
              return (
                <MetadataCard
                  key={tagId}
                  href={AdminRoute.metadata.tags.tag(tagId)}
                  title={tag.name}
                >
                  <TagIcon className="size-5 sm:size-4" />
                  Tag
                </MetadataCard>
              );
            })}
        </MetadataCardList>
      </div>
    </HideIfError>
  );
}
