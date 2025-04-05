import { Lens } from "~/core/lens";

import {
  DescriptionDetails,
  DescriptionList,
  DescriptionTerm,
} from "~/components/ui/description-list";
import { Code } from "~/components/ui/text";

export type LensDetailsProps = {
  lensId: string;
  lens: Lens;
};

export function LensDetails(props: LensDetailsProps) {
  const { lensId, lens } = props;
  return (
    <DescriptionList>
      <DescriptionTerm>Lens ID</DescriptionTerm>
      <DescriptionDetails>
        <code>{lensId}</code>
      </DescriptionDetails>

      <DescriptionTerm>Description</DescriptionTerm>
      <DescriptionDetails>{lens.description}</DescriptionDetails>

      <DescriptionTerm>Exif tag matches</DescriptionTerm>
      <DescriptionDetails>
        <ul className="ml-6">
          {lens.exifTagMatches.map((match) => (
            <li key={match} className="list-disc">
              <Code>{match}</Code>
            </li>
          ))}
        </ul>
      </DescriptionDetails>

      <DescriptionTerm>Photos taken by this lens</DescriptionTerm>
      <DescriptionDetails>(TODO)</DescriptionDetails>
    </DescriptionList>
  );
}
