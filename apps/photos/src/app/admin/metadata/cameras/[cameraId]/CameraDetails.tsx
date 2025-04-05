import { Camera } from "~/core/camera";

import {
  DescriptionDetails,
  DescriptionList,
  DescriptionTerm,
} from "~/components/ui/description-list";
import { Code } from "~/components/ui/text";

export type CameraDetailsProps = {
  cameraId: string;
  camera: Camera;
};

export function CameraDetails(props: CameraDetailsProps) {
  const { cameraId, camera } = props;
  return (
    <DescriptionList>
      <DescriptionTerm>Camera ID</DescriptionTerm>
      <DescriptionDetails>
        <code>{cameraId}</code>
      </DescriptionDetails>

      <DescriptionTerm>Description</DescriptionTerm>
      <DescriptionDetails>{camera.description}</DescriptionDetails>

      <DescriptionTerm>Exif tag matches</DescriptionTerm>
      <DescriptionDetails>
        <ul className="ml-6">
          {camera.exifTagMatches.map((match) => (
            <li key={match} className="list-disc">
              <Code>{match}</Code>
            </li>
          ))}
        </ul>
      </DescriptionDetails>

      <DescriptionTerm>Photos taken by this camera</DescriptionTerm>
      <DescriptionDetails>(TODO)</DescriptionDetails>
    </DescriptionList>
  );
}
