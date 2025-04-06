import { Lens } from "~/core/lens";

import {
  DescriptionDetails,
  DescriptionList,
  DescriptionTerm,
} from "~/components/ui/description-list";
import { Code, Text } from "~/components/ui/text";
import { DateTimeDisplay } from "~/components/core/DateTimeDisplay";

export type LensDetailsProps = {
  lensId: string;
  lens: Lens;
};

export function LensDetails(props: LensDetailsProps) {
  const { lens } = props;
  const { createdAt, description, exifTagMatches } = lens;
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

      <DescriptionTerm>Exif tag matches</DescriptionTerm>
      <DescriptionDetails>
        {exifTagMatches.length === 0 && <Text>(none)</Text>}
        <ul className="ml-6">
          {exifTagMatches.map((match) => (
            <li key={match} className="list-disc">
              <Code>{match}</Code>
            </li>
          ))}
        </ul>
      </DescriptionDetails>

      <DescriptionTerm>Photos taken by this lens</DescriptionTerm>
      <DescriptionDetails>
        <Text>(WIP)</Text>
      </DescriptionDetails>
    </DescriptionList>
  );
}
