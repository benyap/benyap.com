import Link, { LinkProps } from "next/link";
import { AnchorHTMLAttributes, forwardRef } from "react";

export interface LinkWithRefProps
  extends LinkProps,
    Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> {}

export const LinkWithRef = forwardRef<HTMLAnchorElement, LinkWithRefProps>(
  function LinkWithRef(props, ref) {
    const {
      href,
      as,
      replace,
      scroll,
      shallow,
      passHref,
      prefetch,
      locale,
      children,
      ...anchorProps
    } = props;
    return (
      <Link
        href={href}
        as={as}
        replace={replace}
        scroll={scroll}
        shallow={shallow}
        passHref={passHref}
        prefetch={prefetch}
        locale={locale}
      >
        <a ref={ref} {...anchorProps}>
          {children}
        </a>
      </Link>
    );
  }
);
