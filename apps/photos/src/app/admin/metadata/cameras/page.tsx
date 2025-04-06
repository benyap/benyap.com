import { Metadata } from "next";

import { Heading } from "~/components/ui/heading";
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
      <header className="@min-lg:flex-row mb-6 flex flex-col justify-between gap-4">
        <Heading>Cameras</Heading>
        <AddCamera />
      </header>
      <CameraList />
    </>
  );
}
