import { useEffect, useState } from "react";
import { Transition } from "@headlessui/react";
import * as Dialog from "@radix-ui/react-dialog";

import { CopyIcon, IconButton, MailSendIcon } from "@/ui";

export interface FooterEmailDialogProps {
  open?: boolean;
  onClose?: () => void;
  emailUrl?: string;
}

export function FooterEmailDialog(props: FooterEmailDialogProps) {
  const { open, onClose, emailUrl } = props;

  const email = emailUrl?.split(":")[1]?.split("?")[0];
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    if (!email) return;
    navigator.clipboard.writeText(email);
    setCopied(true);
  }

  useEffect(() => {
    if (!copied) return;
    const timeout = window.setTimeout(() => {
      setCopied(false);
    }, 2000);
    return () => clearTimeout(timeout);
  }, [copied]);

  return (
    <Dialog.Root open={open}>
      <Dialog.Portal>
        <div>
          <Transition
            show={open}
            appear
            enter="duration-100"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            as="div"
            className="fixed top-0 left-0 right-0 bottom-0 z-30 grid place-items-center bg-gray-900 bg-opacity-30"
          >
            <Dialog.Content
              onEscapeKeyDown={onClose}
              onPointerDownOutside={onClose}
              onInteractOutside={onClose}
              className="max-w-xl border border-gray-100 bg-brand-light px-10 py-8 shadow-lg dark:border-gray-800 dark:bg-brand-dark md:px-12 md:py-10"
            >
              <p>
                If you would like to get in touch, feel free to send me an email!
                I&nbsp;love helping people and seeing interesting things others have
                done, particularly in the area of web development and design.
              </p>
              <div className="my-8 grid place-items-center">
                {emailUrl && (
                  <div className="flex select-all items-center gap-4">
                    <IconButton color="faded" href={emailUrl}>
                      <MailSendIcon className="h-6 w-6" />
                    </IconButton>
                    <span className="text-lg">{email}</span>
                    <div className="relative flex items-center">
                      <IconButton color="faded" onClick={handleCopy}>
                        <CopyIcon className="h-6 w-6" />
                      </IconButton>
                      <Transition
                        appear
                        show={copied}
                        enter="duration-100"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                        as="span"
                        className="absolute left-[36px] select-none text-sm font-medium text-gray-500 dark:text-gray-400"
                      >
                        Copied
                      </Transition>
                    </div>
                  </div>
                )}
              </div>
              <p>
                As my email inbox is quite susceptible to spam, and time is an
                unfortunately limited resource, let me set some expectations.
              </p>
              <h2 className="mt-4 mb-2 font-bold">I will try my best to respond</h2>
              <ul className="ml-6 list-disc">
                {[
                  "If you send a personally written email about something that clearly matters to you",
                  "If you ask about something that I believe I can help with",
                  "If you want to share or ask for feedback on something that you created / something that you think I will appreciate",
                ].map((text) => (
                  <li key={text} className="mb-1">
                    {text}
                  </li>
                ))}
              </ul>
              <h2 className="mt-4 mb-2 font-bold">I will probably not respond</h2>
              <ul className="ml-6 list-disc">
                {[
                  "If the email is clearly a part of some kind of distribution list",
                  "If you are trying to recruit me for a job",
                  "If you are trying to sell me something or get me to participate in some survey",
                ].map((text) => (
                  <li key={text} className="mb-1">
                    {text}
                  </li>
                ))}
              </ul>
            </Dialog.Content>
          </Transition>
        </div>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
