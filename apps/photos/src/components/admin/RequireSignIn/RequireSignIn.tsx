"use client";

import { useFirebaseUser } from "~/components/firebase/FirebaseUserProvider";
import { Loader } from "~/components/core/Loader";
import { Text } from "~/components/ui/text";
import { Button } from "~/components/ui/button";
import { LogoIcon } from "~/components/icons";
import { Heading } from "~/components/ui/heading";

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
        <div className="w-full max-w-sm space-y-4 rounded-md border px-8 py-10">
          <LogoIcon className="size-8" />
          <Heading className="mb-1">Sign In</Heading>
          <Text>No dodgy people allowed.</Text>
          <Button onClick={signIn}>Continue</Button>
        </div>
      </div>
    );
  }

  if (!token.claims.photosAdmin) {
    return (
      <div className="grid min-h-svh place-items-center px-8">
        <div className="w-full max-w-sm space-y-4 rounded-md border px-6 py-8">
          <Heading className="mb-1">Caught you!</Heading>
          <Text>I said no dodgy people allowed. Sorry.</Text>
          <Button onClick={signOut}>Fine</Button>
        </div>
      </div>
    );
  }

  return children;
}
