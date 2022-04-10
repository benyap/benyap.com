import clsx from "clsx";
import Link from "next/link";

import { DynamicIcon, CTAButton, ChevronRightIcon } from "@/ui";

import { Subheader } from "~/components/elements/Subheader";
import { HtmlContent } from "~/components/elements/HtmlContent";

export interface SkillHighlight {
  key: string;
  labelHtmlContent: string;
  icon: string;
}

export interface SkillsetSectionProps {
  className?: string;
  title?: string;
  highlights?: SkillHighlight[];
  summaryHtmlContent?: string;
}

export function SkillsetSection(props: SkillsetSectionProps) {
  const { className, title, highlights, summaryHtmlContent } = props;
  return (
    <div className={clsx(className, "grid gap-4")}>
      <div className="grid gap-2">
        <Subheader className="mb-4 text-center md:mb-0 md:text-left">{title}</Subheader>
        <ul className="grid gap-8 md:gap-2">
          {highlights?.map(({ key, labelHtmlContent, icon }) => (
            <li
              key={key}
              className="relative flex flex-col items-center gap-4 text-center md:flex-row md:text-left"
            >
              <DynamicIcon
                icon={icon}
                className="absolute -top-5 -z-10 h-16 w-16 text-amber-500 opacity-50 md:relative md:top-0 md:h-8 md:w-8 md:opacity-100"
              />
              <HtmlContent
                element="p"
                className="text-3xl font-black text-gray-700 dark:text-gray-100"
              >
                {labelHtmlContent}
              </HtmlContent>
            </li>
          ))}
        </ul>
      </div>
      <HtmlContent
        element="p"
        className="text-center text-xl font-medium text-gray-600 dark:text-gray-300 md:text-left"
      >
        {summaryHtmlContent}
      </HtmlContent>
      <Link href="/resume" passHref>
        <CTAButton
          className="m-full sm:m-auto sm:w-min md:m-0"
          endIcon={ChevronRightIcon}
        >
          RESUME
        </CTAButton>
      </Link>
    </div>
  );
}
