import { cn } from "~/lib/utils";

export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

type HeadingProps = {
  level?: HeadingLevel;
} & React.ComponentPropsWithoutRef<"h1" | "h2" | "h3" | "h4" | "h5" | "h6">;

export function Heading({ className, level = 1, ...props }: HeadingProps) {
  const Element: `h${typeof level}` = `h${level}`;

  return (
    <Element
      {...props}
      className={cn(
        className,
        "text-2xl/8 font-semibold text-slate-950 sm:text-xl/8 dark:text-white",
      )}
    />
  );
}

export function Subheading({
  className,
  level = 2,
  size = "base",
  ...props
}: HeadingProps & { size?: "base" | "lg" }) {
  const Element: `h${typeof level}` = `h${level}`;

  return (
    <Element
      {...props}
      className={cn(
        className,
        size === "base" && "text-base/7 sm:text-sm/6",
        size === "lg" && "text-lg/7 sm:text-base/6",
        "font-semibold text-slate-950 dark:text-white",
      )}
    />
  );
}
