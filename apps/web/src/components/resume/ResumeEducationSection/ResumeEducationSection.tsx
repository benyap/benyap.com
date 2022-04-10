import clsx from "clsx";

import { ResumeSectionTitle } from "~/components/resume/ResumeSectionTitle";
import { ResumeProjectItem } from "~/components/resume/ResumeProjectItem";

export interface EducationItem {
  image: string;
  subtitle: string;
  title: string;
  date: string;
}

export interface ResumeEducationSectionProps {
  className?: string;
  title?: string;
  education?: EducationItem[];
}

export function ResumeEducationSection(props: ResumeEducationSectionProps) {
  const { className, title, education } = props;
  return (
    <section className={clsx(className, "flex flex-col gap-8")}>
      <ResumeSectionTitle>{title}</ResumeSectionTitle>
      {education?.map((education) => (
        <ResumeProjectItem key={education.subtitle + education.title} {...education} />
      ))}
    </section>
  );
}
