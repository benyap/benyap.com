import clsx from "clsx";
import Link from "next/link";

import { DynamicIcon } from "@/ui";

export interface ContactItem {
  icon?: string;
  label?: string;
  href?: string;
}

export interface ResumeContactSectionProps {
  className?: string;
  items?: ContactItem[];
}

export function ResumeContactSection(props: ResumeContactSectionProps) {
  const { className, items } = props;
  return (
    <section className={clsx(className, "grid gap-2")}>
      {items?.map(({ icon, label, href }) => (
        <div key={label} className="flex items-center gap-2">
          {icon && (
            <DynamicIcon
              icon={icon}
              className={clsx("h-6 w-6 text-gray-500 dark:text-gray-400", {
                "text-red-600 dark:text-red-500": icon === "Map",
                "text-linkedin-blue dark:text-linkedin-blue": icon === "LinkedIn",
                "text-github-black dark:text-github-white": icon === "GitHub",
              })}
            />
          )}
          {href ? (
            <Link href={href} passHref>
              <a className="text-lg underline decoration-transparent decoration-2 underline-offset-1 transition-colors hover:text-gray-900 hover:decoration-sky-500 dark:hover:text-white">
                {label}
              </a>
            </Link>
          ) : (
            <span className="text-lg">{label}</span>
          )}
        </div>
      ))}
    </section>
  );
}
