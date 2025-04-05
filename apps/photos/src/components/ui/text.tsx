import Link from "next/link";

import { cn } from "~/lib/utils";

export function Text({
  className,
  color = "primary",
  ...props
}: React.ComponentPropsWithoutRef<"p"> & {
  color?: "primary" | "secondary" | "custom";
}) {
  return (
    <p
      {...props}
      className={cn(
        className,
        "text-base/6 sm:text-sm/6",
        color === "primary" && "text-slate-600 dark:text-slate-300",
        color === "secondary" && "text-slate-500 dark:text-slate-400",
      )}
    />
  );
}

export function TextLink({
  className,
  customColor = true,
  ...props
}: React.ComponentPropsWithoutRef<typeof Link> & {
  customColor?: boolean;
}) {
  return (
    <Link
      {...props}
      className={cn(
        className,
        "rounded outline-none data-[focus]:ring-2 data-[focus]:ring-blue-500",
        !customColor &&
          "text-slate-950 decoration-slate-950/50 data-[hover]:decoration-slate-950 dark:text-white dark:decoration-white/50 dark:data-[hover]:decoration-white",
      )}
    />
  );
}

export function Strong({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"strong">) {
  return (
    <strong
      {...props}
      className={cn(className, "font-medium text-slate-950 dark:text-white")}
    />
  );
}

export function Code({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"code">) {
  return (
    <code
      {...props}
      className={cn(
        className,
        "rounded border border-slate-950/10 bg-slate-950/[2.5%] px-0.5 text-sm font-medium text-slate-950 sm:text-[0.8125rem] dark:border-white/20 dark:bg-white/5 dark:text-white",
      )}
    />
  );
}
