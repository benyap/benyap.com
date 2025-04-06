"use client";

import clsx from "clsx";

import { useFirebaseUser } from "~/components/firebase/FirebaseUserProvider";
import { Avatar } from "~/components/ui/avatar";

export type UserAvatarProps = { className?: string };

export function UserAvatar(props: UserAvatarProps) {
  const { className } = props;
  const user = useFirebaseUser((s) => s.user);
  return (
    <Avatar
      className={clsx(className, "bg-primary text-primary-foreground size-7")}
      initials={user?.displayName?.at(0)}
    />
  );
}
