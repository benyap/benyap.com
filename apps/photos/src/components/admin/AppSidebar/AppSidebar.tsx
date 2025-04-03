"use client";

import {
  ApertureIcon,
  CameraIcon,
  ChevronUpIcon,
  ExternalLinkIcon,
  ImageIcon,
  LayoutDashboardIcon,
  LibraryBigIcon,
  MapPinIcon,
  TagIcon,
} from "lucide-react";
import Link from "next/link";

import { APP_HOST, isProduction } from "~/constants/app";

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
import { UserAvatar } from "~/components/admin/UserAvatar";
import { LogoIcon } from "~/components/icons";

const LINKS = [
  {
    group: "Content",
    links: [
      {
        label: "Photos",
        href: "/photos",
        icon: ImageIcon,
      },
      {
        label: "Collections",
        href: "/collections",
        icon: LibraryBigIcon,
      },
    ],
  },
  {
    group: "Metadata",
    links: [
      {
        label: "Cameras",
        href: "/cameras",
        icon: CameraIcon,
      },
      {
        label: "Lenses",
        href: "/lenses",
        icon: ApertureIcon,
      },
      {
        label: "Locations",
        href: "/locations",
        icon: MapPinIcon,
      },
      {
        label: "Tags",
        href: "/tags",
        icon: TagIcon,
      },
    ],
  },
];

export function AppSidebar() {
  const { user, signOut } = useFirebaseUser();
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
                  <Link href="/admin">
                    <LayoutDashboardIcon className="text-slate-500" />
                    <Text className="text-slate-800">Dashboard</Text>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link
                    href={`${isProduction() ? "https:" : "http:"}//${APP_HOST}`}
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
                {links.map(({ label, href, icon: Icon }) => (
                  <SidebarMenuItem key={label}>
                    <SidebarMenuButton asChild>
                      <Link href={`/admin/${href}`}>
                        <Icon className="text-slate-500" />
                        <Text className="text-slate-800">{label}</Text>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
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
