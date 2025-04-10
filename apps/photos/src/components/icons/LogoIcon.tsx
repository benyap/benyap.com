import React, { forwardRef } from "react";
type SVGProps = React.SVGAttributes<SVGElement>;
export const LogoIcon = forwardRef<SVGSVGElement, SVGProps>(
  ({ className, ...props }, forwardedRef) => (
    <svg
      viewBox="0 0 1024 1024"
      className={className}
      fill="currentColor"
      ref={forwardedRef}
      {...props}
    >
      <title>{"logo"}</title>
      <path
        d="M34.82,173.71V850.29s185.05-.2,227,0,225.31-10.94,225.31-179.7c0-154.78-174.77-170.48-174.77-170.48s137.93-24.28,137.93-159.63c0-148.21-150.49-166.77-183.9-166.77Z"
        fill="current"
      />
      <polygon
        points="494.55 174.13 989.18 174.71 742.88 555.36 742.66 555.36 742.45 554.79 742.88 555.36 494.55 174.13"
        fill="current"
      />
      <rect width={1024} height={1024} fill="none" />
    </svg>
  ),
);
LogoIcon.displayName = "LogoIcon";
