import { Tag } from "~/core/tag";

import {
  DescriptionDetails,
  DescriptionList,
  DescriptionTerm,
} from "~/components/ui/description-list";
import { Text } from "~/components/ui/text";
import { DateTimeDisplay } from "~/components/core/DateTimeDisplay";

export type TagDetailsProps = {
  tagId: string;
  tag: Tag;
};

export function TagDetails(props: TagDetailsProps) {
  const { tag: camera } = props;
  const { createdAt, description } = camera;
  return (
    <DescriptionList>
      <DescriptionTerm>Created</DescriptionTerm>
      <DescriptionDetails>
        <DateTimeDisplay>{createdAt}</DateTimeDisplay>
      </DescriptionDetails>

      <DescriptionTerm>Description</DescriptionTerm>
      <DescriptionDetails>
        {description || <Text>(none)</Text>}
      </DescriptionDetails>

      <DescriptionTerm>Photos taken tagged with this tag</DescriptionTerm>
      <DescriptionDetails>
        <Text>(WIP)</Text>
      </DescriptionDetails>
    </DescriptionList>
  );
}
