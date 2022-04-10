import { GetStaticProps } from "next";
import Head from "next/head";

import { navigationLinks } from "~/content/navigation";
import { footerLinks } from "~/content/footer";

import { useScreenNameForAnalytics } from "~/hooks/firebase";

import { Navigation, NavigationProps } from "~/components/core/Navigation";
import { Footer, FooterProps } from "~/components/core/Footer";
import {
  ResumeTitleSection,
  ResumeTitleSectionProps,
} from "~/components/resume/ResumeTitleSection";
import {
  ResumeContactSection,
  ResumeContactSectionProps,
} from "~/components/resume/ResumeContactSection";
import {
  ResumeSummarySection,
  ResumeSummarySectionProps,
} from "~/components/resume/ResumeSummarySection";
import {
  ResumeSkillsSection,
  ResumeSkillsSectionProps,
} from "~/components/resume/ResumeSkillsSection";
import {
  ResumeExperienceSection,
  ResumeExperienceSectionProps,
} from "~/components/resume/ResumeExperienceSection";
import {
  ResumeAchievementsSection,
  ResumeAchievementsSectionProps,
} from "~/components/resume/ResumeAchievementsSection";
import {
  ResumeEducationSection,
  ResumeEducationSectionProps,
} from "~/components/resume/ResumeEducationSection";
import {
  ResumeAfterhoursSection,
  ResumeAfterhoursSectionProps,
} from "~/components/resume/ResumeAfterhoursSection";

export interface ResumePageProps {
  navigation: NavigationProps;
  footer: FooterProps;
  titleSection: ResumeTitleSectionProps;
  contactSection: ResumeContactSectionProps;
  summarySection: ResumeSummarySectionProps;
  skillsSection: ResumeSkillsSectionProps;
  experienceSection: ResumeExperienceSectionProps;
  achievementsSection: ResumeAchievementsSectionProps;
  educationSection: ResumeEducationSectionProps;
  afterhoursSection: ResumeAfterhoursSectionProps;
}

export default function ResumePage(props: ResumePageProps) {
  useScreenNameForAnalytics("resume");
  const {
    navigation,
    titleSection,
    contactSection,
    summarySection,
    skillsSection,
    experienceSection,
    achievementsSection,
    educationSection,
    afterhoursSection,
    footer,
  } = props;

  return (
    <>
      <Head>
        <title>Resume - benyap.com</title>
      </Head>
      <Navigation className="print:hidden" {...navigation} />
      <main className="flex flex-col items-center gap-12 px-8 print:my-16">
        <ResumeTitleSection className="w-full max-w-[600px]" {...titleSection} />
        <ResumeContactSection className="w-full max-w-[600px]" {...contactSection} />
        <ResumeSummarySection className="w-full max-w-[600px]" {...summarySection} />
        <ResumeSkillsSection className="w-full max-w-[600px]" {...skillsSection} />
        <ResumeExperienceSection
          className="w-full max-w-[600px]"
          {...experienceSection}
        />
        <ResumeAchievementsSection
          className="w-full max-w-[600px]"
          {...achievementsSection}
        />
        <ResumeEducationSection
          className="w-full max-w-[600px]"
          {...educationSection}
        />
        <ResumeAfterhoursSection
          className="w-full max-w-[600px]"
          {...afterhoursSection}
        />
      </main>
      <Footer className="print:hidden" {...footer} />
    </>
  );
}

export const getStaticProps: GetStaticProps<ResumePageProps> = async () => {
  // TODO: use a CMS
  return {
    props: {
      navigation: {
        links: navigationLinks,
      },
      titleSection: {
        title: "Ben Yap",
        subtitle: "developer & designer",
        actionIcon: "Download",
      },
      contactSection: {
        items: [
          { icon: "Map", label: "Melbourne, Australia" },
          { icon: "Envelope", label: "contact@benyap.com" },
          {
            icon: "LinkedIn",
            label: "@benjaminyapau",
            href: "https://linkedin.com/in/benjaminyapau",
          },
          {
            icon: "GitHub",
            label: "@benyap",
            href: "https://github.com/benyap",
          },
        ],
      },
      summarySection: {
        htmlContent: `
          Passionate about using my skills and expertise to design, inspire and create innovative products and solutions.
          Motivated in self learning and continuous improvement, with an aptitude for detail and technical excellence.
          Always looking to find better ways to use existing technologies and learn new ones.
        `,
      },
      skillsSection: {
        title: "Expertise",
        skillSets: [
          {
            title: `Skills & Knowledge Areas`,
            keywords: [
              "Graphic design principles",
              "UI & UX design",
              "Web design",
              "API design",
              "Software design patterns",
              "Project management",
              "Agile methodology",
            ],
          },
          {
            title: `Technologies`,
            keywords: [
              "JavaScript",
              "TypeScript",
              "Python",
              "Node.js",
              "NestJS",
              "Next.js",
              "Firebase",
              "React",
              "Tailwind",
              "Sass & CSS",
              "GraphQL",
              "PostgreSQL",
              "OAuth",
              "Docker",
              "Terraform",
              "Figma",
              "Adobe Illustrator",
              "Vercel",
              "Amazon Web Services",
              "Google Cloud Platform",
            ],
          },
        ],
      },
      experienceSection: {
        title: "Experience",
        experience: [
          {
            subtitle: "Software Engineer",
            title: "PeakHour Urban Technologies",
            date: "Sep 2020 – present",
            description: [
              `Designed, implemented and deployed solutions with microservice architectures to consume and process live traffic data on AWS`,
              `Implemented machine learning processes using Python and Node.js to train models for predicting traffic`,
            ],
          },
          {
            subtitle: "Software Engineer",
            title: "eSolutions, Monash University",
            date: "Mar 2018 – present",
            description: [
              `Implemented enhancements to existing student-facing applications`,
              `UI design, system design, full-stack implementation and deployment for several new applications to replace legacy systems on GCP`,
            ],
          },
          {
            subtitle: "Co-founder, Software Engineer",
            title: "TutoringTodayAU",
            date: "2018 – 2019",
            description: [
              `Co-founded the business with two other partners, with the goal of connecting students to suitable tutors`,
              `Designed, built and deployed business website and internal student / tutor portal for tracking tutoring sessions and payments`,
              `Provided tutoring to several students in general and VCE mathematics`,
            ],
          },
          {
            subtitle: "Software Engineering Intern",
            title: "Deloitte Digital",
            date: "Jul 2017 – Dec 2017",
            description: [
              `Developed frontend modules for client sites using Angular and Sitecore`,
              `Implemented monitoring microservices using AWS and Terraform`,
              `Administered system workflows and configurations for applications in the Atlassian suite`,
            ],
          },
        ],
      },
      achievementsSection: {
        title: "Achievements",
        achievements: [
          {
            subtitle: "Monash University",
            title: "Dux of Undergraduate, BSE",
            date: "2020",
          },
          {
            subtitle: "Monash University",
            title: "Scholarship for Excellence",
            date: "2015 – 2017",
          },
          {
            subtitle: "Monash University",
            title: "Dean's Achievement Award",
            date: "2015",
          },
        ],
      },
      educationSection: {
        title: "Education",
        education: [
          {
            image: "/logos/monash.svg",
            subtitle: "Monash University",
            title: "Bachelor of Software Engineering",
            date: "2015 – 2019",
          },
          {
            image: "/logos/cgs.png",
            subtitle: "Camberwell Grammar School",
            title: "Victorian Certificate of Education",
            date: "2009 – 2014",
          },
        ],
      },
      afterhoursSection: {
        title: "Afterhours",
        projects: [
          {
            title: "Spur Afrika",
            date: "2020",
            description: [
              `Overhauled website design to be more modern and mobile friendly`,
              `Transformed web platform from Wordpress to a custom built solution with Firebase and Next.js`,
            ],
          },
          {
            title: "Amazing Race / goracerunner",
            date: "2017 – 2019",
            githubRepository: "goracerunner/racerunner-web",
            description: [
              `Designed and built a mobile-first web application for hosting an Amazing Race competition for a group of friends`,
              `Frontend built with React using Redux and Blueprint JS`,
              `Backend API built with Express and GraphQL, integrating with AWS S3 for file storage, MongoDB as a database, and deployed to Heroku`,
              `Rebuilt the platform two years later with a more modern design using Material UI and utilising Firebase for realtime data updates`,
            ],
          },
          {
            title: "CCCV Community: resource management platform",
            date: "2018",
            description: [
              `Designed and built a web platform to manage ministry resources`,
              `Frontend built with React using Material UI and Redux`,
              `Backend API built with Express and GraphQL, integrating with Auth0 for authentication, AWS S3 for file storage and MongoDB as a database`,
              `Used Terraform to automate the provisioning of infrastructure on AWS`,
            ],
          },
          {
            title: "Family Feud",
            date: "2016",
            githubRepository: "benyap/java-familyfeud",
            description: [
              `Designed and built a desktop application using Java to play Family Feud with an audience using multiple displays`,
            ],
          },
        ],
      },
      footer: {
        links: footerLinks,
      },
    },
  };
};
