import clsx from "clsx";

export type PaperProps = React.ComponentProps<"div">;

export function Paper(props: PaperProps) {
  const { children, className, ...divProps } = props;
  return (
    <div
      className={clsx(className, "rounded-lg bg-white drop-shadow-md")}
      {...divProps}
    >
      {children}
    </div>
  );
}
