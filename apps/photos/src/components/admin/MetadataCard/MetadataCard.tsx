import { ImageIcon } from "lucide-react";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  LinkCard,
} from "~/components/ui/card";
import { SkeletonText } from "~/components/ui/skeleton";

export function MetadataCard(props: {
  href: string;
  title?: React.ReactNode;
  photoCount?: React.ReactNode;
}) {
  const { href, title, photoCount = "(unknown)" } = props;
  return (
    <LinkCard dense href={href}>
      <CardHeader>
        <CardTitle className="truncate">{title}</CardTitle>
        <CardDescription className="flex items-center gap-1">
          <ImageIcon className="size-5 sm:size-4" /> {photoCount}
        </CardDescription>
      </CardHeader>
    </LinkCard>
  );
}

MetadataCard.Placeholder = function MetadataCardPlaceholder() {
  return (
    <Card dense>
      <CardHeader>
        <CardTitle>
          <SkeletonText className="w-40" />
        </CardTitle>
        <CardDescription className="flex items-center gap-1">
          <ImageIcon className="size-5 sm:size-4" />
          <SkeletonText className="w-8" />
        </CardDescription>
      </CardHeader>
    </Card>
  );
};
