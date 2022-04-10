import { HtmlContent } from "~/components/elements/HtmlContent";

export interface ResumeSummarySectionProps {
  className?: string;
  htmlContent?: string;
}

export function ResumeSummarySection(props: ResumeSummarySectionProps) {
  const { className, htmlContent } = props;
  return (
    <section className={className}>
      <HtmlContent className="text-lg">{htmlContent}</HtmlContent>
    </section>
  );
}
