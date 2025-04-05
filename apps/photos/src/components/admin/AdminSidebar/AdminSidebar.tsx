"use client";

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ApertureIcon,
  CameraIcon,
  ChevronUpIcon,
  ExternalLinkIcon,
  HomeIcon,
  ImageIcon,
  LibraryBigIcon,
  MapPinIcon,
  TagIcon,
} from "lucide-react";

import { AdminRoute, PublicRoute } from "~/constants/routes";

import { useFirebaseUser } from "~/components/firebase/FirebaseUserProvider";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "~/components/ui/sidebar";
import { Text } from "~/components/ui/typography";
import { UserAvatar } from "~/components/core/UserAvatar";
import { LogoIcon } from "~/components/icons";

const LINKS = [
  {
    group: "Content",
    links: [
      {
        label: "Photos",
        href: AdminRoute.photos.index,
        icon: ImageIcon,
      },
      {
        label: "Collections",
        href: AdminRoute.collections.index,
        icon: LibraryBigIcon,
      },
    ],
  },
  {
    group: "Metadata",
    links: [
      {
        label: "Cameras",
        href: AdminRoute.metadata.cameras.index,
        icon: CameraIcon,
      },
      {
        label: "Lenses",
        href: AdminRoute.metadata.lenses.index,
        icon: ApertureIcon,
      },
      {
        label: "Locations",
        href: AdminRoute.metadata.locations.index,
        icon: MapPinIcon,
      },
      {
        label: "Tags",
        href: AdminRoute.metadata.tags.index,
        icon: TagIcon,
      },
    ],
  },
];

export function AdminSidebar() {
  const { user, signOut } = useFirebaseUser();

  const pathname = usePathname();
  const home = pathname === AdminRoute.index;

  return (
    <Sidebar variant="floating">
      <SidebarHeader className="flex flex-row items-center gap-1 p-4 md:py-2">
        <LogoIcon className="size-5 fill-slate-800" />
        <Text className="font-bold text-sky-600">Photos</Text>
        <Text className="text-slate-600">admin</Text>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href={AdminRoute.index}>
                    <HomeIcon
                      className={clsx(home ? "text-sky-600" : "text-slate-500")}
                    />
                    <Text
                      className={clsx("text-slate-800", home && "font-medium")}
                    >
                      Dashboard
                    </Text>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link
                    href={PublicRoute.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLinkIcon className="text-slate-500" />
                    <Text className="text-slate-800">Visit site</Text>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        {LINKS.map(({ group, links }) => (
          <SidebarGroup key={group}>
            <SidebarGroupLabel>{group}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {links.map(({ label, href, icon: Icon }) => {
                  const active = pathname.startsWith(href);
                  return (
                    <SidebarMenuItem key={label}>
                      <SidebarMenuButton asChild>
                        <Link href={href}>
                          <Icon
                            className={clsx(
                              active ? "text-sky-600" : "text-slate-500",
                            )}
                          />
                          <Text
                            className={clsx(
                              "text-slate-800",
                              active && "font-medium",
                            )}
                          >
                            {label}
                          </Text>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton className="h-fit py-3">
                  <UserAvatar />
                  <div>
                    <Text style="small" className="mb-0.5">
                      {user?.displayName}
                    </Text>
                    <Text
                      className="max-w-48 truncate md:max-w-36"
                      style="muted"
                    >
                      {user?.email}
                    </Text>
                  </div>
                  <ChevronUpIcon className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                className="w-[var(--radix-popper-anchor-width)]"
              >
                <DropdownMenuItem onClick={signOut}>
                  <span>Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
