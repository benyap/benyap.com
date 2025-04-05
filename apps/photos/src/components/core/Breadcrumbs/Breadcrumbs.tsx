import clsx from "clsx";
import Link from "next/link";
import { ChevronRightIcon } from "lucide-react";

import { SkeletonText } from "~/components/ui/skeleton";
import { Text } from "~/components/ui/text";

export type BreadcrumbLink = {
  href?: string;
  label?: React.ReactNode;
  loading?: boolean;
};

export function Breadcrumbs(props: {
  className?: string;
  root: BreadcrumbLink & { current?: boolean };
  links?: BreadcrumbLink[];
}) {
  const { className, root, links = [] } = props;

  return (
    <nav aria-label="Breadcrumb" className={clsx(className, "mb-4 flex")}>
      <ol role="list" className="flex flex-wrap items-center gap-x-2 gap-y-2">
        <li className="shrink-0 last:mr-0">
          <div className="flex items-center gap-2">
            <Link
              href={root.href ?? "/"}
              aria-current={root.current ? "page" : undefined}
            >
              <Text className="hover:text-inherit">{root.label}</Text>
            </Link>
            <ChevronRightIcon
              aria-hidden="true"
              className="size-4 shrink-0 text-slate-400"
            />
          </div>
        </li>
        {links.map((link, index) => {
          const label =
            link.label ||
            (link.loading ? <SkeletonText className="w-20" /> : null);
          return (
            <li key={index}>
              <div className="flex items-center">
                {link.href ? (
                  <Link href={link.href}>
                    <Text className="hover:text-inherit">{label}</Text>
                  </Link>
                ) : (
                  <Text>{label}</Text>
                )}
                {index !== links.length - 1 && (
                  <ChevronRightIcon
                    aria-hidden="true"
                    className="ml-2 size-4 shrink-0 text-slate-400"
                  />
                )}
              </div>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
