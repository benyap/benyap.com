import clsx from "clsx";
import Image from "next/image";

import { DynamicIcon, IconButton } from "@/ui";

export interface ResumeProjectItemProps {
  className?: string;
  classes?: {
    iconClass?: string;
  };
  subtitle?: string;
  title?: string;
  link?: {
    url: string;
    icon: string;
  };
  date?: string;
  description?: string[];
  icon?: string;
  image?: string;
}

export function ResumeProjectItem(props: ResumeProjectItemProps) {
  const {
    className,
    subtitle,
    title,
    link,
    date,
    description,
    image,
    icon,
    classes = {},
  } = props;
  return (
    <div className={clsx(className, "flex flex-col gap-2")}>
      <div className="flex items-end gap-4">
        {icon && (
          <DynamicIcon
            className={clsx(
              classes.iconClass ?? "mb-1 h-6 w-6 text-gray-500 dark:text-gray-400"
            )}
            icon={icon}
          />
        )}
        {image && (
          <div className="relative h-12 w-12">
            <Image
              src={image}
              alt={subtitle}
              layout="responsive"
              width={200}
              height={200}
            />
          </div>
        )}
        <div className="flex w-full items-center justify-between">
          <div className="flex flex-col">
            <p className="text-sm font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
              {subtitle}
            </p>
            <h3 className="text-lg font-medium">{title}</h3>
          </div>
          <div className="flex items-center gap-2">
            {link && (
              <IconButton className="print:rounded-none" href={link.url}>
                <DynamicIcon className="h-6 w-6 print:hidden" icon={link.icon} />
              </IconButton>
            )}
            <span className="font-bold">{date}</span>
          </div>
        </div>
      </div>
      {description?.length && (
        <div className="my-2 ml-3 border-l-2 border-gray-300 pl-4 dark:border-gray-600 ">
          <ul className="ml-5 list-disc font-medium leading-7 text-gray-500 dark:text-gray-400">
            {description?.map((text) => (
              <li key={text}>{text}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
