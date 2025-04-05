import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { Text } from "~/components/ui/text";
import { SidebarTrigger } from "~/components/ui/sidebar";
import { AdminAccountMenu } from "~/components/admin/AdminAccountMenu";
import { UserAvatar } from "~/components/core/UserAvatar";
import { Button } from "~/components/ui/button";

export function AdminHeader() {
  return (
    <header className="flex w-full items-center justify-between px-4 py-3">
      <div className="flex items-center gap-2">
        <SidebarTrigger className="-ml-1.5" />
        <Text>photos.benyap.com</Text>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-fit rounded-full p-0">
            <UserAvatar />
          </Button>
        </DropdownMenuTrigger>
        <AdminAccountMenu className="mr-4 mt-2 min-w-[200px]" />
      </DropdownMenu>
    </header>
  );
}
