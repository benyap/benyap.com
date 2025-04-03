import clsx from "clsx";

export type TypographyProps = {
  className?: string;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span";
  style?:
    | "display"
    | "title"
    | "heading"
    | "subheading"
    | "lead"
    | "body"
    | "large"
    | "small"
    | "muted";
  paragraph?: boolean;
};

export function Text(props: React.PropsWithChildren<TypographyProps>) {
  const {
    className,
    as: Component = "p",
    style = "body",
    paragraph,
    children,
  } = props;
  return (
    <Component
      className={clsx(
        className,
        style === "display" &&
          "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl",
        style === "title" &&
          "scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0",
        style === "heading" &&
          "scroll-m-20 text-2xl font-semibold tracking-tight",
        style === "subheading" &&
          "scroll-m-20 text-xl font-semibold tracking-tight",
        style === "lead" && "text-muted-foreground text-xl",
        style === "body" && "leading-7",
        style === "large" && "text-lg font-semibold",
        style === "small" && "text-sm font-medium leading-none",
        style === "muted" && "text-muted-foreground text-sm",
        paragraph && "[&:not(:first-child)]:mt-6",
      )}
    >
      {children}
    </Component>
  );
}
