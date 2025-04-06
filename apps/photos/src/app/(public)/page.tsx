import { GithubIcon, LogoIcon } from "~/components/icons";

export default async function Page() {
  return (
    <div className="grid min-h-svh place-items-center text-slate-700">
      <div className="w-full max-w-2xl space-y-12 px-8">
        <main className="space-y-6 sm:space-y-8">
          <LogoIcon className="size-16 fill-slate-700" />
          <h1 className="text-4xl font-bold text-sky-600 sm:text-6xl">
            photos.benyap.com
          </h1>
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
