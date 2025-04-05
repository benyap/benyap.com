import { Metadata } from "next";

import { AdminRoute } from "~/constants/routes";

import { Text } from "~/components/ui/typography";
import { Heading } from "~/components/core/Heading";
import { AdminBreadcrumbs } from "~/components/core/Breadcrumbs";

import { AddCamera } from "./AddCamera";
import { CameraList } from "./CameraList";

export const metadata: Metadata = {
  title: "Cameras",
};

export default function Page() {
  return (
    <>
      <AdminBreadcrumbs
        links={[{ href: AdminRoute.metadata.cameras.index, label: "Cameras" }]}
      />
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
