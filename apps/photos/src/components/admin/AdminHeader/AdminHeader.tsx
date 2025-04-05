import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { Text } from "~/components/ui/typography";
import { SidebarTrigger } from "~/components/ui/sidebar";
import { AdminAccountMenu } from "~/components/admin/AdminAccountMenu";
import { UserAvatar } from "~/components/core/UserAvatar";

export function AdminHeader() {
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
        <AdminAccountMenu className="mr-4 mt-2 min-w-[200px]" />
      </DropdownMenu>
    </header>
  );
}
