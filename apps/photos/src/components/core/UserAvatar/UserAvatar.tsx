"use client";

import clsx from "clsx";
import { useFirebaseUser } from "~/components/firebase/FirebaseUserProvider";
import { Avatar, AvatarFallback } from "~/components/ui/avatar";

export type UserAvatarProps = { className?: string };

export function UserAvatar({ className }: UserAvatarProps) {
  const user = useFirebaseUser((s) => s.user);
  return (
    <Avatar>
      <AvatarFallback className={clsx(className, "bg-slate-800 text-white")}>
        {user?.displayName?.at(0)}
      </AvatarFallback>
    </Avatar>
  );
}
