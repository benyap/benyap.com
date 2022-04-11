import clsx from "clsx";

import { IconProps } from "./_props";

export function ChevronRightIcon(props: IconProps) {
  const { className } = props;
  return (
    <svg
      className={clsx("fill-current", className)}
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      height="100%"
      viewBox="0 0 24 24"
    >
      <path d="M10.707 17.707 16.414 12l-5.707-5.707-1.414 1.414L13.586 12l-4.293 4.293z"></path>
    </svg>
  );
}

export default ChevronRightIcon;
