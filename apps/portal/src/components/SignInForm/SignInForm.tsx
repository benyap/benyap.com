"use client";

import { Duration } from "luxon";
import { useTransition } from "react";
import { useSearchParams } from "next/navigation";
import { getAuth, getIdToken, signInWithEmailAndPassword } from "firebase/auth";

import { signInWithIDToken } from "@packages/auth";

export type SignInFormProps = {
  className?: string;
  /** The form fields to render. */
  children?: React.ReactNode;
  /** The CSRF token to use in the request. */
  csrf?: string;
  /** The max age of the session to sign in for in seconds. Defaults to 24 hours. */
  maxAge?: number;
  /** The path to redirect to after sign in. Defaults to the `redirect` search param, or "/" if the `redirect` search param is not present. */
  redirect?: string;
};

/**
 * Renders a `<form>` element that will sign the user in when submitted.
 *
 * Form inputs and a button of type `submit` should be passed as children.
 *
 * Inputs with the following names are expected:
 * - `email`
 * - `password`
 */
export function SignInForm(props: SignInFormProps) {
  const searchParams = useSearchParams();

  const {
    className,
    children,
    csrf,
    maxAge = Duration.fromObject({ hours: 24 }).as("seconds"),
    redirect = searchParams.get("redirect")?.toString() ?? "/",
  } = props;

  const signIn = signInWithIDToken.bind(null, { cookie: { maxAge }, redirect });

  async function onSubmit(event: React.SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const email = data.get("email")?.toString() ?? "";
    const password = data.get("password")?.toString() ?? "";

    const auth = getAuth();
    const { user } = await signInWithEmailAndPassword(auth, email, password);
    const token = await getIdToken(user);

    const form = new FormData();
    form.append("token", token);
    form.append("csrf_token", csrf ?? "");

    await signIn(form);
  }

  const [, startTransition] = useTransition();

  return (
    <form
      className={className}
      onSubmit={(e) => startTransition(() => onSubmit(e))}
    >
      {children}
    </form>
  );
}
