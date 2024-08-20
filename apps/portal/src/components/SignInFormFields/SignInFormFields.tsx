"use client";

import { useFormStatus } from "react-dom";

export function SignInFormFields() {
  const { pending } = useFormStatus();

  return (
    <>
      <label className="flex flex-col gap-1 disabled:opacity-50">
        <span className="text-brand-black text-base">Email</span>
        <input
          className="border-brand-200 rounded text-base"
          name="email"
          type="email"
          autoComplete="email"
          disabled={pending}
        />
      </label>
      <label className="flex flex-col gap-1 disabled:opacity-50">
        <span className="text-brand-black text-base">Password</span>
        <input
          className="border-brand-200 rounded text-base"
          name="password"
          type="password"
          autoComplete="current-password"
          disabled={pending}
        />
      </label>
      <button
        type="submit"
        className="bg-brand-black text-brand-white hover:bg-brand-800 mt-2 rounded py-2 disabled:opacity-50"
        disabled={pending}
      >
        Sign in
      </button>
    </>
  );
}
