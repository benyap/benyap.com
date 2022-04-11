import clsx from "clsx";

import { IconProps } from "./_props";

export function DownloadIcon(props: IconProps) {
  const { className } = props;
  return (
    <svg
      className={clsx("fill-current", className)}
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      height="100%"
      viewBox="0 0 24 24"
    >
      <path d="M19 9h-4V3H9v6H5l7 8zM4 19h16v2H4z"></path>
    </svg>
  );
}

export default DownloadIcon;
