"use client";

import clsx from "clsx";

import { useFirebaseUser } from "~/components/firebase/FirebaseUserProvider";
import {
  DropdownMenuContent,
  DropdownMenuItem,
} from "~/components/ui/dropdown-menu";

export type AccountMenuProps = { className?: string };

export function AccountMenu(props: AccountMenuProps) {
  const { className } = props;
  const { signOut } = useFirebaseUser();
  return (
    <DropdownMenuContent
      side="top"
      className={clsx(className, "mr-4 mt-2 min-w-[200px]")}
    >
      <DropdownMenuItem onClick={signOut}>
        <span>Sign out</span>
      </DropdownMenuItem>
    </DropdownMenuContent>
  );
}
