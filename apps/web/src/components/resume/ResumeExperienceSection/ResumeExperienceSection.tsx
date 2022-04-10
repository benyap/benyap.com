import clsx from "clsx";

import { ResumeSectionTitle } from "~/components/resume/ResumeSectionTitle";
import { ResumeProjectItem } from "~/components/resume/ResumeProjectItem";

export interface ExperienceItem {
  subtitle: string;
  title: string;
  date: string;
  description: string[];
}

export interface ResumeExperienceSectionProps {
  className?: string;
  title?: string;
  experience?: ExperienceItem[];
}

export function ResumeExperienceSection(props: ResumeExperienceSectionProps) {
  const { className, title, experience } = props;
  return (
    <section className={clsx(className, "flex flex-col gap-8")}>
      <ResumeSectionTitle>{title}</ResumeSectionTitle>
      {experience?.map((experience) => (
        <ResumeProjectItem
          key={experience.subtitle + experience.title}
          {...experience}
          icon="Work"
        />
      ))}
    </section>
  );
}
