import { Metadata } from "next";

import { Text } from "~/components/ui/typography";
import { Heading } from "~/components/core/Heading";

import { AddCamera } from "./AddCamera";
import { CameraList } from "./CameraList";

export const metadata: Metadata = {
  title: "Cameras",
};

export default function Page() {
  return (
    <>
      <Heading collapseWhenNarrow>
        <Text as="h1" style="heading">
          Cameras
        </Text>
        <AddCamera />
      </Heading>
      <CameraList />
    </>
  );
}
