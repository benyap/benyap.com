import Image from "next/image";
import clsx from "clsx";
import { HtmlContent } from "~/components/elements/HtmlContent";

export interface HeaderSectionProps {
  className?: string;
  image?: string;
  titleHtmlContent?: string;
  subtitleHtmlContent?: string;
  highlight?: number;
}

export function HeaderSection(props: HeaderSectionProps) {
  const {
    className,
    image,
    titleHtmlContent,
    subtitleHtmlContent,
    highlight = 0,
  } = props;
  return (
    <div
      className={clsx(
        className,
        "flex flex-col items-center gap-4 text-center md:flex-row md:gap-8 md:text-left"
      )}
    >
      <div className="relative h-[120px] w-[120px] overflow-hidden rounded-full md:h-[100px] md:w-[100px]">
        {image && <Image src={image} layout="fill" alt="Ben Yap" />}
      </div>
      <div className="flex flex-col justify-center gap-2">
        <h1 className="text-5xl font-black text-gray-800 dark:text-gray-100">
          {highlight === 0 ? (
            titleHtmlContent
          ) : (
            <>
              <span className="text-sky-600 dark:text-sky-500">
                {titleHtmlContent?.slice(0, highlight)}
              </span>
              {titleHtmlContent?.slice(highlight)}
            </>
          )}
        </h1>
        <HtmlContent
          element="h2"
          className="text-2xl font-bold text-gray-500 dark:text-gray-400"
        >
          {subtitleHtmlContent}
        </HtmlContent>
      </div>
    </div>
  );
}
