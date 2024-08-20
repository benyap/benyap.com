import clsx from "clsx";

import { LogoSVG } from "@packages/svgs";

export type LoadingLogoProps = {
  className?: string;
} & Pick<React.AriaAttributes, "aria-label">;

export function LoadingLogo(props: LoadingLogoProps) {
  const { className, "aria-label": ariaLabel = "Loading" } = props;
  return (
    <div
      role="progressbar"
      aria-label={ariaLabel}
      className={clsx(
        className,
        "animate-fadeIn animate-duration-1000 grid place-content-center",
      )}
    >
      <div className="animate-twPulse animate-infinite animate-delay-1000">
        <LogoSVG className="text-brand-800 size-24" />
      </div>
    </div>
  );
}
