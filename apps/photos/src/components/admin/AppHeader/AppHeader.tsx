import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { Text } from "~/components/ui/typography";
import { SidebarTrigger } from "~/components/ui/sidebar";
import { AccountMenu } from "~/components/admin/AccountMenu";
import { UserAvatar } from "~/components/admin/UserAvatar";

export function AppHeader() {
  return (
    <header className="flex w-full items-center justify-between px-4 py-3">
      <div className="flex items-center gap-2">
        <SidebarTrigger className="-ml-1.5" />
        <Text style="muted">photos.benyap.com</Text>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="h-fit rounded-full">
            <UserAvatar className="hover:bg-slate-700" />
          </button>
        </DropdownMenuTrigger>
        <AccountMenu className="mr-4 mt-2 min-w-[200px]" />
      </DropdownMenu>
    </header>
  );
}
