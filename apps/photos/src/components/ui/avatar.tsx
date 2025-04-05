"use client";

import * as React from "react";
import Image from "next/image";
import clsx from "clsx";

type AvatarProps = {
  src?: string | null;
  square?: boolean;
  initials?: string | undefined;
  alt?: string;
  className?: string;
};

export function Avatar({
  src = null,
  square = false,
  initials,
  alt = "",
  className,
  ...props
}: AvatarProps & React.ComponentPropsWithoutRef<"span">) {
  return (
    <span
      data-slot="avatar"
      {...props}
      className={clsx(
        className,
        // Basic layout
        "inline-grid shrink-0 align-middle [--avatar-radius:20%] [--ring-opacity:20%] *:col-start-1 *:row-start-1",
        // Add the correct border radius
        square
          ? "rounded-[--avatar-radius] *:rounded-[--avatar-radius]"
          : "rounded-full *:rounded-full",
      )}
    >
      {initials && (
        <svg
          className="size-full select-none fill-current p-[5%] text-[56px] font-medium uppercase"
          viewBox="0 0 100 100"
          aria-hidden={alt ? undefined : "true"}
        >
          {alt && <title>{alt}</title>}
          <text
            x="50%"
            y="50%"
            alignmentBaseline="middle"
            dominantBaseline="middle"
            textAnchor="middle"
            dy=".125em"
          >
            {initials}
          </text>
        </svg>
      )}
      {src && <Image className="size-full" src={src} alt={alt} />}
    </span>
  );
}
