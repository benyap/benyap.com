import { Metadata } from "next";

import { Heading } from "~/components/ui/heading";
import { PageHeader } from "~/components/core/PageHeader";
import { AdminBreadcrumbs } from "~/components/core/Breadcrumbs";
import { ImagePreviewProvider } from "~/components/core/ImagePreviewProvider";

import { AddPhotos } from "./AddPhotos";

export const metadata: Metadata = {
  title: "Photos",
};

export default function Page() {
  return (
    <>
      <AdminBreadcrumbs links={[{ label: "Photos" }]} />
      <PageHeader className="@min-lg:flex-row flex-col">
        <Heading>Photos</Heading>
        <ImagePreviewProvider>
          <AddPhotos />
        </ImagePreviewProvider>
      </PageHeader>
    </>
  );
}
