import { GetStaticProps } from "next";

import { navigationLinks } from "~/content/navigation";
import { footerLinks } from "~/content/footer";

import { useScreenNameForAnalytics } from "~/hooks/firebase";

import { Subheader } from "~/components/elements/Subheader";

import { Navigation, NavigationProps } from "~/components/core/Navigation";
import { Footer, FooterProps } from "~/components/core/Footer";
import { HeaderSection, HeaderSectionProps } from "~/components/sections/HeaderSection";
import {
  SummarySection,
  SummarySectionProps,
} from "~/components/sections/SummarySection";
import {
  SkillsetSection,
  SkillsetSectionProps,
} from "~/components/sections/SkillsetSection";

export interface IndexPageProps {
  navigation: NavigationProps;
  headerSection: HeaderSectionProps;
  summarySection: SummarySectionProps;
  skillsetSection: SkillsetSectionProps;
  footer: FooterProps;
}

export default function IndexPage(props: IndexPageProps) {
  const { navigation, headerSection, summarySection, skillsetSection, footer } = props;
  useScreenNameForAnalytics("home");
  return (
    <>
      <Navigation {...navigation} />
      <main className="flex flex-col items-center gap-12 px-8">
        <HeaderSection className="w-full max-w-[600px]" {...headerSection} />
        <SummarySection className="w-full max-w-[600px]" {...summarySection} />
        <SkillsetSection className="w-full max-w-[600px]" {...skillsetSection} />
        <div className="grid w-full max-w-[600px] justify-center gap-2 md:justify-start">
          <Subheader className="text-center md:text-left">Coming soon</Subheader>
          <p className="max-w-md text-center text-lg md:max-w-full md:text-left">
            This site is currently under construction. More content coming soon!
          </p>
        </div>
      </main>
      <Footer {...footer} />
    </>
  );
}

export const getStaticProps: GetStaticProps<IndexPageProps> = async () => {
  // TODO: use a CMS
  return {
    props: {
      navigation: {
        links: navigationLinks,
      },
      headerSection: {
        image: "/avatars/benyap.jpg",
        titleHtmlContent: "@benyap",
        subtitleHtmlContent: "designer & developer",
        highlight: 1,
      },
      summarySection: {
        summaryHtmlContent: `
          Hello! I'm Ben, a designer & developer based in Melbourne, Australia.
          My passion is to use my use my skills and expertise to design,
          inspire and create innovative products and solutions.
        `,
      },
      skillsetSection: {
        title: "My skillset",
        highlights: [
          {
            icon: "Bolt",
            key: "design",
            labelHtmlContent: "UI & UX design",
          },
          {
            icon: "World",
            key: "development",
            labelHtmlContent: "Fullstack web development",
          },
          {
            icon: "Bulb",
            key: "passion",
            labelHtmlContent: "A passion for problem&nbsp;solving",
          },
        ],
        summaryHtmlContent: "Always eager to learn something&nbsp;new.",
      },
      footer: {
        links: footerLinks,
      },
    },
  };
};
