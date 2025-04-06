import { HomeIcon } from "lucide-react";

import { AdminRoute } from "~/constants/routes";

import { BreadcrumbLink, Breadcrumbs } from "./Breadcrumbs";

export function AdminBreadcrumbs(props: { links: BreadcrumbLink[] }) {
  const { links } = props;
  return (
    <Breadcrumbs
      root={{
        href: AdminRoute.index,
        label: <HomeIcon className="size-5 sm:size-4" />,
        current: links.length === 0,
      }}
      links={links}
    />
  );
}
