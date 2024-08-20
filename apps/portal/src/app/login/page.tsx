import { redirect } from "next/navigation";

import { getUser } from "@packages/auth";
import { LogoSVG } from "@packages/svgs";
import { getCsrfToken } from "@packages/utils";

import { Paper } from "~/components/Paper";
import { SignInForm } from "~/components/SignInForm";
import { SignInFormFields } from "~/components/SignInFormFields";

export default async function Page() {
  const user = await getUser();
  if (user) redirect("/");

  const csrf = getCsrfToken();

  return (
    <main className="grid h-[80svh] min-h-[500px] place-items-center px-8">
      <Paper className="w-full max-w-sm space-y-6 px-8 py-12">
        <LogoSVG className="text-brand-black mb-6 size-16" />
        <div className="space-y-2">
          <h1 className="text-heading-base text-brand-black">Welcome</h1>
          <p className="text-highlight-500 text-lg">
            Please sign in to continue.
          </p>
        </div>
        <SignInForm className="flex flex-col gap-4" csrf={csrf}>
          <SignInFormFields />
        </SignInForm>
      </Paper>
    </main>
  );
}
