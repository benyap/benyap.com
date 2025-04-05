"use client";

import Link from "next/link";
import { useTheme } from "next-themes";

import { AdminRoute } from "~/constants/routes";

import { useFirebaseUser } from "~/components/firebase/FirebaseUserProvider";
import {
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from "~/components/ui/dropdown-menu";

export type AdminAccountMenuProps = { className?: string };

export function AdminAccountMenu(props: AdminAccountMenuProps) {
  const { className } = props;

  const { signOut } = useFirebaseUser();
  const { setTheme } = useTheme();

  return (
    <DropdownMenuContent side="top" className={className}>
      <DropdownMenuGroup>
        <DropdownMenuItem asChild>
          <Link href={AdminRoute.account.index}>Account</Link>
        </DropdownMenuItem>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>Theme</DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent>
              <DropdownMenuItem onClick={() => setTheme("light")}>
                Light
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")}>
                Dark
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("system")}>
                System
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
      </DropdownMenuGroup>
      <DropdownMenuSeparator />
      <DropdownMenuGroup>
        <DropdownMenuItem onClick={signOut}>Sign out</DropdownMenuItem>
      </DropdownMenuGroup>
    </DropdownMenuContent>
  );
}
