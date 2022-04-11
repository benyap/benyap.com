import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import { Transition } from "@headlessui/react";
import * as Dropdown from "@radix-ui/react-dropdown-menu";
import { useIsomorphicEffect } from "@mantine/hooks";

import { LaptopIcon, MoonIcon, SunIcon } from "@/ui";

import { THEME_MODE_KEY } from "~/config/constants";

const settings = [
  {
    value: "light",
    label: "Light",
    icon: SunIcon,
  },
  {
    value: "dark",
    label: "Dark",
    icon: MoonIcon,
  },
  {
    value: "system",
    label: "System",
    icon: LaptopIcon,
  },
] as const;

function updateTheme() {
  document.documentElement.classList.add("disable-transitions");
  if (
    (THEME_MODE_KEY in localStorage && localStorage[THEME_MODE_KEY] === "dark") ||
    window.matchMedia("(prefers-color-scheme: dark)").matches
  ) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
  window.setTimeout(() => {
    document.documentElement.classList.remove("disable-transitions");
  });
}

function createStorageHandler(
  setTheme: React.Dispatch<React.SetStateAction<"light" | "dark" | "system">>
) {
  return () => {
    updateTheme();
    const theme = localStorage.getItem(THEME_MODE_KEY);
    if (theme === "light" || theme === "dark") setTheme(theme);
    else setTheme("system");
  };
}

/**
 * @see https://github.com/tailwindlabs/tailwindcss.com/blob/master/src/components/ThemeToggle.js
 */
function useTheme() {
  const [theme, setTheme] = useState<"light" | "dark" | "system">("system");
  const initial = useRef(true);

  useIsomorphicEffect(() => {
    const theme = localStorage[THEME_MODE_KEY];
    if (theme === "light" || theme === "dark") setTheme(theme);
  }, []);

  useIsomorphicEffect(() => {
    switch (theme) {
      case "system":
        localStorage.removeItem(THEME_MODE_KEY);
        break;
      case "light":
      case "dark":
        localStorage.setItem(THEME_MODE_KEY, theme);
        break;
    }
    if (initial.current) initial.current = false;
    else updateTheme();
  }, [theme]);

  useEffect(() => {
    // Watch for system scheme change
    const query = window.matchMedia("(prefers-color-scheme: dark)");
    if (query.addEventListener) query.addEventListener("change", updateTheme);
    else query.addListener(updateTheme); // Support for legacy browsers

    // Watch for local storage changes
    const storageHandler = createStorageHandler(setTheme);
    window.addEventListener("storage", storageHandler);

    return () => {
      if (query.removeEventListener) query.removeEventListener("change", updateTheme);
      else query.removeListener(updateTheme); // Support for legacy browsers
      window.removeEventListener("storage", storageHandler);
    };
  }, []);

  return [theme, setTheme] as const;
}

export interface ThemeToggleProps {
  className?: string;
}

export function ThemeToggle(props: ThemeToggleProps) {
  const { className } = props;
  const [theme, setTheme] = useTheme();
  const [open, setOpen] = useState(false);
  return (
    <Dropdown.Root open={open} onOpenChange={setOpen}>
      <Dropdown.Trigger asChild>
        <button
          aria-label="theme"
          className={clsx(
            className,
            "rounded-full p-1 text-gray-400 transition hover:text-gray-500 dark:text-gray-500 hover:dark:text-gray-400"
          )}
        >
          <span className="dark:hidden">
            <SunIcon
              className={clsx("h-6 w-6", {
                "text-sky-600 dark:text-sky-500": theme === "light",
              })}
            />
          </span>
          <span className="hidden dark:inline">
            <MoonIcon
              className={clsx("h-6 w-6", {
                "text-sky-600 dark:text-sky-500": theme === "dark",
              })}
            />
          </span>
        </button>
      </Dropdown.Trigger>
      <Dropdown.Content side="bottom" sideOffset={8}>
        <Transition
          show={open}
          appear
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          as="div"
          className={clsx(
            "flex flex-col border py-1 shadow-md",
            "border-gray-200 bg-white dark:border-gray-600 dark:bg-brand-dark-300"
          )}
        >
          {settings.map(({ label, value, icon: Icon }) => (
            <Dropdown.Item key={value} asChild>
              <button
                className={clsx(
                  "flex w-full items-center gap-3 px-4 py-2 transition",
                  "hover:bg-gray-100 dark:hover:bg-gray-600",
                  { "text-sky-600 dark:text-sky-500": theme === value }
                )}
                onClick={() => setTheme(value)}
              >
                <Icon
                  className={clsx("h-5 w-5", {
                    "text-sky-600 dark:text-sky-500": theme === value,
                    "text-gray-500 dark:text-gray-400": theme !== value,
                  })}
                />
                <span
                  className={clsx("text-sm font-medium", {
                    "font-medium text-gray-600 dark:text-gray-200": theme !== value,
                    "font-bold text-sky-600 dark:text-sky-500": theme === value,
                  })}
                >
                  {label}
                </span>
              </button>
            </Dropdown.Item>
          ))}
        </Transition>
      </Dropdown.Content>
    </Dropdown.Root>
  );
}
