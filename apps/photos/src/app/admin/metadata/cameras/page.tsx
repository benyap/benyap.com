import { Metadata } from "next";

import { Heading } from "~/components/ui/heading";
import { PageHeader } from "~/components/core/PageHeader";
import { AdminBreadcrumbs } from "~/components/core/Breadcrumbs";

import { AddCamera } from "./AddCamera";
import { CameraList } from "./CameraList";

export const metadata: Metadata = {
  title: "Cameras",
};

export default function Page() {
  return (
    <>
      <AdminBreadcrumbs links={[{ label: "Cameras" }]} />
      <PageHeader className="@min-lg:flex-row flex-col">
        <Heading>Cameras</Heading>
        <AddCamera />
      </PageHeader>
      <CameraList />
    </>
  );
}
