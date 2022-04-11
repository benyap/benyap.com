import clsx from "clsx";

export interface SubheaderProps {
  className?: string;
  children?: React.ReactNode;
  color?: "primary" | "secondary";
}

export function Subheader(props: SubheaderProps) {
  const { className, children, color = "primary" } = props;
  return (
    <h3
      className={clsx(className, " uppercase", {
        "font-extrabold text-sky-600 dark:text-sky-400": color === "primary",
        "font-medium text-gray-500 dark:text-gray-400": color === "secondary",
      })}
    >
      {children}
    </h3>
  );
}
