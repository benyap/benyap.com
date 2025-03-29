import { Metadata } from "next";

import { LogoIcon, GithubIcon } from "~/components/icons";
import { Typed } from "~/components/core/Typed";

export const metadata: Metadata = {
  title: {
    default: "benyap.com",
    template: "%s - benyap.com",
  },
  description: "Ben Yap's online space.",
};

const GREETINGS = ["Hello!", "你好！", "こんにちは！", "Bonjour!"];

export default function Page() {
  return (
    <div className="grid min-h-svh place-items-center text-slate-700">
      <div className="space-y-12 px-8">
        <main className="max-w-2xl space-y-6 sm:space-y-8">
          <LogoIcon className="size-16 fill-slate-700" />
          <h1 className="text-4xl font-bold text-sky-600 sm:text-6xl">
            benyap.com
          </h1>
          <div className="space-y-4 text-xl sm:text-2xl">
            <p>
              <Typed
                strings={GREETINGS}
                showCursor={false}
                backDelay={10_000}
                loop
              />
              &nbsp;
            </p>
            <p>
              I'm <b>Ben</b> and I'm a human based in Melbourne, Australia.
            </p>
            <p>
              Welcome to my online space, where I can share a little bit of
              myself with the world.
            </p>
          </div>
          <div>
            <p className="text-lg text-slate-500">More content coming soon.</p>
          </div>
        </main>
        <footer className="flex items-center justify-between">
          <p className="font-light text-slate-500">
            &copy; {new Date().getFullYear()} benyap.com
          </p>
          <div>
            <a href="https://github.com/benyap" className="group font-light">
              <GithubIcon className="size-5 fill-slate-500 transition group-hover:fill-[#1f2328]" />
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
}
