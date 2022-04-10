import clsx from "clsx";
import { HtmlContent } from "~/components/elements/HtmlContent";

export interface SummarySectionProps {
  className?: string;
  summaryHtmlContent?: string;
}

export function SummarySection(props: SummarySectionProps) {
  const { className, summaryHtmlContent } = props;
  return (
    <div className={clsx(className, "text-center md:text-left")}>
      <HtmlContent element="p" className="text-lg">
        {summaryHtmlContent}
      </HtmlContent>
    </div>
  );
}
