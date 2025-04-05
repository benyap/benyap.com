"use client";

import { ImageIcon } from "lucide-react";
import Link from "next/link";

import { AdminRoute } from "~/constants/routes";
import { Lens, getLenses } from "~/core/lens";

import { useSnapshot } from "~/hooks/use-snapshot";
import { Text } from "~/components/ui/text";
import { SkeletonText } from "~/components/ui/skeleton";
import { Subheading } from "~/components/ui/heading";
import { HideIfError } from "~/components/core/HideIfError";

export function LensList() {
  const [loading, snapshot, error] = useSnapshot(getLenses());

  return (
    <HideIfError errorTitle="Could not list lenses" error={error}>
      <div className="@container">
        <div className="@min-lg:grid-cols-2 @min-4xl:grid-cols-3 grid grid-cols-1 gap-2">
          {loading && (
            <>
              <LensCardPlaceholder />
              <LensCardPlaceholder />
              <LensCardPlaceholder />
            </>
          )}
          {!loading && snapshot?.empty && (
            <Text color="secondary">
              No lenses found. Create one to get started.
            </Text>
          )}
          {snapshot?.docs.map((doc) => {
            const lensId = doc.id;
            const lens = doc.data();
            return <LensCard key={lensId} lensId={lensId} lens={lens} />;
          })}
        </div>
      </div>
    </HideIfError>
  );
}

function LensCard(props: { lensId: string; lens: Lens }) {
  const { lensId, lens } = props;
  return (
    <Link
      href={AdminRoute.metadata.lenses.lens(lensId)}
      className="hover:bg-accent focus-visible:border-ring focus-visible:ring-ring/50 dark:hover:bg-input/50 dark:border-input space-y-1 rounded-md border p-3 outline-none transition-all focus-visible:ring-[3px]"
    >
      <Subheading className="font-medium">{lens.name}</Subheading>
      <div className="flex gap-4">
        <Text className="flex items-center gap-1">
          <ImageIcon className="size-4" /> (unknown)
        </Text>
      </div>
    </Link>
  );
}

function LensCardPlaceholder() {
  return (
    <div className="space-y-1 rounded-md border p-3">
      <Text className="font-medium">
        <SkeletonText className="w-40" />
      </Text>
      <div className="flex gap-4">
        <Text className="flex items-center gap-1">
          <ImageIcon className="size-4" /> <SkeletonText className="w-8" />
        </Text>
      </div>
    </div>
  );
}
