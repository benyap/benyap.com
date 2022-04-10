import clsx from "clsx";

import { ResumeSectionTitle } from "~/components/resume/ResumeSectionTitle";

export interface SkillSet {
  title: string;
  keywords: string[];
}

export interface ResumeSkillsSectionProps {
  className?: string;
  title?: string;
  skillSets?: SkillSet[];
}

export function ResumeSkillsSection(props: ResumeSkillsSectionProps) {
  const { className, title, skillSets } = props;
  return (
    <section className={clsx(className, "flex flex-col gap-8")}>
      <ResumeSectionTitle>{title}</ResumeSectionTitle>
      {skillSets?.map(({ title, keywords }) => (
        <div key={title} className="flex flex-col gap-2">
          <h3 className="text-sm font-medium uppercase text-gray-500 dark:text-gray-400">
            {title}
          </h3>
          <ul className="flex flex-wrap gap-2">
            {keywords.map((word) => (
              <li
                key={word}
                className="rounded-lg bg-gray-200 px-3 py-1 text-sm font-medium text-gray-800 dark:bg-gray-600 dark:text-gray-100"
              >
                {word}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </section>
  );
}
