import { Location } from "~/core/location";

import {
  DescriptionDetails,
  DescriptionList,
  DescriptionTerm,
} from "~/components/ui/description-list";
import { Text } from "~/components/ui/text";
import { DateTimeDisplay } from "~/components/core/DateTimeDisplay";

export type LocationDetailsProps = {
  locationId: string;
  location: Location;
};

export function LocationDetails(props: LocationDetailsProps) {
  const { location } = props;
  const { createdAt, type, description } = location;
  return (
    <DescriptionList>
      <DescriptionTerm>Created</DescriptionTerm>
      <DescriptionDetails>
        <DateTimeDisplay>{createdAt}</DateTimeDisplay>
      </DescriptionDetails>

      <DescriptionTerm>Type</DescriptionTerm>
      <DescriptionDetails className="capitalize">{type}</DescriptionDetails>

      <DescriptionTerm>Description</DescriptionTerm>
      <DescriptionDetails>
        {description || <Text>(none)</Text>}
      </DescriptionDetails>

      <DescriptionTerm>Related to</DescriptionTerm>
      <DescriptionDetails>
        <Text>(WIP)</Text>
      </DescriptionDetails>

      <DescriptionTerm>Photos taken at this location</DescriptionTerm>
      <DescriptionDetails>
        <Text>(WIP)</Text>
      </DescriptionDetails>
    </DescriptionList>
  );
}
