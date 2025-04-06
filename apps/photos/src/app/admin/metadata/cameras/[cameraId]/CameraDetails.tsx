import { Camera } from "~/core/camera";

import {
  DescriptionDetails,
  DescriptionList,
  DescriptionTerm,
} from "~/components/ui/description-list";
import { Code, Text } from "~/components/ui/text";
import { DateTimeDisplay } from "~/components/core/DateTimeDisplay";

export type CameraDetailsProps = {
  cameraId: string;
  camera: Camera;
};

export function CameraDetails(props: CameraDetailsProps) {
  const { camera } = props;
  const { createdAt, description, exifTagMatches } = camera;
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

      <DescriptionTerm>Photos taken by this camera</DescriptionTerm>
      <DescriptionDetails>
        <Text>(WIP)</Text>
      </DescriptionDetails>
    </DescriptionList>
  );
}
