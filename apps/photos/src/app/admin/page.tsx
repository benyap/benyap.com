"use client";

import { useFirebaseUser } from "~/components/firebase/FirebaseUserProvider";

export default function Page() {
  const { loading, user, signIn, signOut } = useFirebaseUser((store) => store);

  if (loading) return "Loading...";

  return (
    <div className="m-4">
      <h1 className="font-bold">
        {user ? `Hello ${user.displayName}` : "Please sign in"}
      </h1>
      <p className="mt-4">
        <button
          className="rounded bg-slate-300 px-4 py-2 hover:bg-slate-400"
          onClick={user ? signOut : signIn}
        >
          Sign {user ? "Out" : "In"}
        </button>
      </p>
    </div>
  );
}
