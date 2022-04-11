import { forwardRef, MouseEventHandler } from "react";
import Link from "next/link";
import clsx from "clsx";

export interface IconButtonProps {
  className?: string;
  children?: React.ReactNode;
  href?: string;
  disabled?: boolean;
  color?: "default" | "faded";
  onClick?: MouseEventHandler<HTMLAnchorElement | HTMLButtonElement>;
}

export const IconButton = forwardRef<
  HTMLAnchorElement | HTMLButtonElement,
  IconButtonProps
>((props, ref) => {
  const { className, children, href, disabled, color = "default", onClick } = props;
  const Component = href ? "a" : "button";
  const link = (
    <Component
      ref={ref as any} // FIXME: type error
      href={href!}
      onClick={onClick}
      disabled={disabled}
      className={clsx(className, "overflow-hidden rounded-full p-1", {
        "text-gray-500 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300":
          color === "default" && !disabled,
        "text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400":
          color === "faded",
        "transition ": !disabled,
        "cursor-not-allowed opacity-60": disabled,
        "inline-block": Component === "a",
      })}
    >
      {children}
    </Component>
  );
  return href ? <Link href={href}>{link}</Link> : link;
});
