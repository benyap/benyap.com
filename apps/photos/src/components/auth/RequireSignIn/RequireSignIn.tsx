"use client";

import { useFirebaseUser } from "~/components/firebase/FirebaseUserProvider";
import { Loader } from "~/components/core/Loader";
import { Text } from "~/components/ui/typography";
import { Button } from "~/components/ui/button";
import { LogoIcon } from "~/components/icons";

export function RequireSignIn(props: React.PropsWithChildren) {
  const { children } = props;

  const { token, loading, signIn, signOut } = useFirebaseUser();

  if (loading)
    return (
      <div className="grid min-h-svh w-full place-items-center">
        <Loader />
      </div>
    );

  if (!token) {
    return (
      <div className="grid min-h-svh place-items-center px-8">
        <div className="w-full max-w-sm space-y-4 rounded-md border border-slate-200 px-8 py-10">
          <LogoIcon className="size-12 fill-slate-800" />
          <Text as="h1" style="large">
            Sign In
          </Text>
          <Text style="muted">No dodgy people allowed.</Text>
          <Button onClick={signIn}>Continue</Button>
        </div>
      </div>
    );
  }

  if (!token.claims.photosAdmin) {
    return (
      <div className="grid min-h-svh place-items-center px-8">
        <div className="w-full max-w-sm space-y-4 rounded-md border border-slate-200 px-6 py-8">
          <Text as="h1" style="large">
            Caught you!
          </Text>
          <Text style="muted">I said no dodgy people allowed. Sorry.</Text>
          <Button onClick={signOut}>Fine</Button>
        </div>
      </div>
    );
  }

  return children;
}
