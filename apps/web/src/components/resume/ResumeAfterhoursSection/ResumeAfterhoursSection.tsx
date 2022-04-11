import clsx from "clsx";

import { ResumeSectionTitle } from "~/components/resume/ResumeSectionTitle";
import { ResumeProjectItem } from "~/components/resume/ResumeProjectItem";

export interface ProjectItem {
  subtitle?: string;
  title: string;
  date: string;
  description: string[];
  githubRepository?: string;
}

export interface ResumeAfterhoursSectionProps {
  className?: string;
  title?: string;
  projects?: ProjectItem[];
}

export function ResumeAfterhoursSection(props: ResumeAfterhoursSectionProps) {
  const { className, title, projects } = props;
  return (
    <section className={clsx(className, "flex flex-col gap-8")}>
      <ResumeSectionTitle>{title}</ResumeSectionTitle>
      {projects?.map((projects) => (
        <ResumeProjectItem
          key={projects.subtitle + projects.title}
          {...projects}
          link={
            projects.githubRepository
              ? {
                  icon: "GitHub",
                  url: `https://github.com/${projects.githubRepository}`,
                }
              : undefined
          }
          icon="Experiment"
        />
      ))}
    </section>
  );
}
