import { forwardRef, MouseEventHandler } from "react";
import Link from "next/link";
import clsx from "clsx";

import { IconElement } from "../../icons";

export interface CTAButtonProps {
  className?: string;
  children?: string;
  href?: string;
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLAnchorElement | HTMLButtonElement>;
  endIcon?: IconElement;
}

export const CTAButton = forwardRef<
  HTMLAnchorElement | HTMLButtonElement,
  CTAButtonProps
>((props, ref) => {
  const { className, children, href, disabled, onClick, endIcon: EndIcon } = props;
  const Component = href ? "a" : "button";
  const link = (
    <Component
      ref={ref as any} // FIXME: type error
      href={href}
      onClick={onClick}
      disabled={disabled}
      className={clsx(
        className,
        "flex justify-center gap-2 bg-sky-600 py-3 font-bold shadow outline-offset-4 transition dark:bg-sky-500",
        {
          "text-white hover:bg-sky-500 active:bg-sky-600 dark:hover:bg-sky-400 dark:active:bg-sky-500":
            !disabled,
          "cursor-not-allowed bg-opacity-50 text-white dark:bg-opacity-60 dark:text-sky-200":
            disabled,
          "px-6": !EndIcon,
          "pl-6 pr-3": EndIcon,
        }
      )}
    >
      {children} {EndIcon && <EndIcon className="h-6 w-6" />}
    </Component>
  );
  return href ? <Link href={href}>{link}</Link> : link;
});
