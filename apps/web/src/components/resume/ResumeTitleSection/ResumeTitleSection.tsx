import { MouseEventHandler } from "react";
import clsx from "clsx";

import { IconButton, DynamicIcon } from "@/ui";

export interface ResumeTitleSectionProps {
  className?: string;
  title?: string;
  subtitle?: string;
  actionIcon?: string;
  onAction?: MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
}

export function ResumeTitleSection(props: ResumeTitleSectionProps) {
  const { className, title, subtitle, onAction, actionIcon } = props;
  return (
    <section className={clsx(className, "flex items-center justify-between")}>
      <div className="flex flex-col gap-2">
        <h1 className="text-5xl font-black text-gray-800 dark:text-gray-100">
          {title}
        </h1>
        <p className="text-2xl font-bold text-gray-500 dark:text-gray-400">
          {subtitle}
        </p>
      </div>
      {actionIcon && onAction && (
        <IconButton className="print:hidden" onClick={onAction}>
          <DynamicIcon icon={actionIcon} className="h-8 w-8" />
        </IconButton>
      )}
    </section>
  );
}
