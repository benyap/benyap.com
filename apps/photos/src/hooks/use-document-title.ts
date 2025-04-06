import { useEffect } from "react";
import { usePathname } from "next/navigation";

import { AdminRoute } from "~/constants/routes";
import { getSiteAdminTitle, getSiteTitle } from "~/constants/metadata";

/**
 * Set the document title in client components using
 * the site's title template as specified.
 */
export function useDocumentTitle(title?: string) {
  const pathname = usePathname();

  useEffect(() => {
    document.title = pathname.startsWith(AdminRoute.index)
      ? getSiteAdminTitle(title)
      : getSiteTitle(title);
  }, [title, pathname]);
}
