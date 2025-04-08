import { ApertureIcon, CameraIcon, MapPinIcon, TagIcon } from "lucide-react";

import {
  useFindMetadata,
  useMetadata,
} from "~/components/metadata/MetadataProvider";
import { Text } from "~/components/ui/text";

const ICON_MAP = {
  cameras: CameraIcon,
  lenses: ApertureIcon,
  locations: MapPinIcon,
  tags: TagIcon,
};

export function MetadataBadge(
  props: React.PropsWithChildren<{
    type?: "focalLength" | "fNumber" | "iso" | "shutterSpeed";
    match?: keyof ReturnType<typeof useMetadata>;
    matchId?: string;
  }>,
) {
  const { type, match, matchId, children } = props;

  const findMetadata = useFindMetadata();

  if (!match || !matchId) {
    return (
      <Text className="flex items-center gap-1.5 truncate">
        {type === "fNumber" && "ƒ/"}
        {type === "iso" && "ISO "}
        {children}
        {type === "focalLength" && "mm"}
      </Text>
    );
  }

  const result = findMetadata(match, matchId);

  if (!result) return null;

  const Icon = ICON_MAP[match];

  return (
    <Text className="flex items-center gap-1.5">
      <Icon className="size-5 shrink-0 sm:size-4" />
      <span>{result.data().name}</span>
    </Text>
  );
}
