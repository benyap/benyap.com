import { cn } from "~/lib/utils";

import { MetadataCard } from "~/components/metadata/MetadataCard";

export function MetadataCardList(
  props: React.PropsWithChildren<{
    className?: string;
    showPlaceholders?: boolean;
    placeholders?: number;
  }>,
) {
  const { className, children, showPlaceholders, placeholders = 3 } = props;
  return (
    <div
      className={cn(
        className,
        "@min-lg:grid-cols-2 @min-4xl:grid-cols-3 @min-7xl:grid-cols-4 grid grid-cols-1 gap-2",
      )}
    >
      {showPlaceholders &&
        Array.from({ length: placeholders }).map((_, index) => (
          <MetadataCard.Placeholder key={index} />
        ))}
      {children}
    </div>
  );
}
