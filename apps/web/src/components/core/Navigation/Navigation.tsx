import Link from "next/link";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { Transition } from "@headlessui/react";
import { useMediaQuery } from "@mantine/hooks";
import * as Dropdown from "@radix-ui/react-dropdown-menu";

import { Logo, MenuIcon, XIcon } from "@/ui";

import { usePastScrollPosition } from "~/hooks/window";

import { ThemeToggle } from "~/components/core/ThemeToggle";
import { LinkWithRef } from "~/components/elements/LinkWithRef";

export interface NavigationLink {
  label: string;
  href: string;
}

export interface NavigationProps {
  className?: string;
  links?: NavigationLink[];
}

export function Navigation(props: NavigationProps) {
  const { className, links } = props;

  const [open, setOpen] = useState(false);
  const scrolledDown = usePastScrollPosition(100);

  // See Tailwind defaults: https://tailwindcss.com/docs/responsive-design#overview
  const desktop = useMediaQuery("(min-width: 768px)");

  // Always close menu when we exceed the medium breakpoint
  useEffect(() => {
    if (desktop) setOpen(false);
  }, [desktop]);

  return (
    <>
      <nav
        className={clsx(
          className,
          "sticky top-0 z-20 mb-8 flex justify-between border-b px-6 py-4 transition duration-300 md:mb-12 md:px-10",
          {
            "border-transparent": !scrolledDown,
            "border-gray-200 backdrop-blur dark:border-gray-700": scrolledDown,
          }
        )}
      >
        <Link href="/" passHref>
          <a className="rounded-full p-2 transition md:-ml-3 md:p-3">
            <Logo className="h-8 w-8 text-brand-dark dark:text-brand-light md:h-10 md:w-10" />
          </a>
        </Link>
        <div className="hidden items-center gap-8 self-center md:flex">
          <div className="flex gap-6">
            {links?.map(({ label, href }) => (
              <Link key={label} href={href} passHref>
                <a
                  className={clsx(
                    "px-2 font-bold text-gray-700 transition hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-50",
                    "underline decoration-transparent decoration-2 underline-offset-8 hover:decoration-sky-500"
                  )}
                >
                  {label}
                </a>
              </Link>
            ))}
          </div>
          <div className="h-5 w-0.5 bg-gray-300 dark:bg-gray-600" />
          <ThemeToggle className="-ml-2" />
        </div>
        <Dropdown.Root open={open} onOpenChange={setOpen}>
          <Dropdown.Trigger asChild className="self-center md:hidden">
            <button
              aria-label="Menu"
              className={clsx("rounded-full p-1", {
                "text-gray-600 hover:text-gray-500 dark:text-gray-300 dark:hover:text-gray-50":
                  !open,
                "text-white": open,
              })}
            >
              {open ? <XIcon className="h-8 w-8" /> : <MenuIcon className="h-8 w-8" />}
            </button>
          </Dropdown.Trigger>
          <Dropdown.Content side="bottom" sideOffset={20}>
            <Transition
              show={open}
              appear
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              as="div"
              className={clsx(
                "flex w-[calc(100vw-48px)] flex-col border py-1 shadow-md",
                "border-gray-200 bg-white dark:border-gray-600 dark:bg-brand-dark-300"
              )}
            >
              {links?.map(({ label, href }) => (
                <Dropdown.Item key={label} asChild>
                  <LinkWithRef
                    href={href}
                    onClick={() => setOpen(false)}
                    className={clsx(
                      "gap-3 px-6 py-3 text-center font-semibold uppercase tracking-wide transition",
                      "hover:bg-gray-100 dark:hover:bg-gray-600"
                    )}
                  >
                    {label}
                  </LinkWithRef>
                </Dropdown.Item>
              ))}
            </Transition>
          </Dropdown.Content>
        </Dropdown.Root>
      </nav>
      <Transition
        id="navigation-overlay"
        show={open}
        enter="ease-out transition duration-300"
        enterFrom="bg-opacity-0"
        enterTo="bg-opacity-100"
        className="absolute top-0 left-0 z-10 h-full w-screen bg-black opacity-50 md:hidden"
        as="div"
      />
    </>
  );
}
