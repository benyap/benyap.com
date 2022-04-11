---
to: packages/ui/icons/<%= h.changeCase.pascal(name) %>Icon.tsx
---
import clsx from "clsx";

import { IconProps } from "./_props";

export function <%= h.changeCase.pascal(name) %>Icon(props: IconProps) {
  const { className } = props;
  return (
    <svg
      className={clsx("fill-current", className)}
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      height="100%"
      viewBox="0 0 24 24"
    >
      {/* TODO: Your SVG path here */}
    </svg>
  );
}

export default <%= h.changeCase.pascal(name) %>Icon;
