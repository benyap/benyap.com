import { useState } from "react";
import clsx from "clsx";
import { useDisclosure } from "@mantine/hooks";

import { DynamicIcon, IconButton } from "@/ui";

import { FooterEmailDialog } from "./FooterEmailDialog";

export interface FooterIconLink {
  url: string;
  label: string;
  icon: string;
}

export interface FooterProps {
  className?: string;
  links?: FooterIconLink[];
}

export function Footer(props: FooterProps) {
  const { className, links } = props;

  const [showEmailDialog, emailDialog] = useDisclosure(false);
  const [emailUrl, setEmailUrl] = useState("");

  function handleShowEmail(url: string) {
    setEmailUrl(url);
    emailDialog.open();
  }

  return (
    <footer
      className={clsx(
        className,
        "grid w-full justify-center gap-1 py-16 text-gray-400 dark:text-gray-500"
      )}
    >
      {links && (
        <ul className="grid grid-flow-col justify-center gap-3">
          {links.map(({ url, label, icon }) => {
            // Handle "mailto:"" links so that users have a choice to view and copy
            // the email address instead of opening up their email client immediately
            if (url.startsWith("mailto:")) {
              return (
                <IconButton
                  key={label}
                  href={url}
                  color="faded"
                  onClick={(e) => {
                    e.preventDefault();
                    handleShowEmail(url);
                  }}
                >
                  <DynamicIcon className="h-6 w-6" icon={icon} />
                </IconButton>
              );
            }
            return (
              <IconButton key={label} href={url} color="faded">
                <DynamicIcon className="h-6 w-6" icon={icon} />
              </IconButton>
            );
          })}
        </ul>
      )}
      <p className="text-base font-medium">
        Copyright &copy; {new Date().getFullYear()} Ben Yap
      </p>
      <FooterEmailDialog
        open={showEmailDialog}
        onClose={emailDialog.close}
        emailUrl={emailUrl}
      />
    </footer>
  );
}
