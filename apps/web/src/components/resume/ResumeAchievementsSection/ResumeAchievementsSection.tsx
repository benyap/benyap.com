import clsx from "clsx";

import { ResumeSectionTitle } from "~/components/resume/ResumeSectionTitle";
import { ResumeProjectItem } from "~/components/resume/ResumeProjectItem";

export interface AchievementItem {
  subtitle: string;
  title: string;
  date: string;
}

export interface ResumeAchievementsSectionProps {
  className?: string;
  title?: string;
  achievements?: AchievementItem[];
}

export function ResumeAchievementsSection(props: ResumeAchievementsSectionProps) {
  const { className, title, achievements } = props;
  return (
    <section className={clsx(className, "flex flex-col gap-8")}>
      <ResumeSectionTitle>{title}</ResumeSectionTitle>
      {achievements?.map((achievements) => (
        <ResumeProjectItem
          key={achievements.subtitle + achievements.title}
          {...achievements}
          classes={{
            iconClass: "h-8 w-8 text-gray-500 dark:text-gray-400 self-center",
          }}
          icon="Award"
        />
      ))}
    </section>
  );
}
