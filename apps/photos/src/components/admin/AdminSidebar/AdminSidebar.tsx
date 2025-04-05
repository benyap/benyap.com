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
  useSidebar,
} from "~/components/ui/sidebar";
import { Text } from "~/components/ui/text";
import { UserAvatar } from "~/components/core/UserAvatar";
import { LogoIcon } from "~/components/icons";
import { AdminAccountMenu } from "~/components/admin/AdminAccountMenu";
import { useEffect } from "react";

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
  const { user } = useFirebaseUser();
  const { isMobile, setOpenMobile } = useSidebar();

  const pathname = usePathname();
  const homeActive = pathname === AdminRoute.index;

  // Close mobile sidebar when pathname changes
  useEffect(() => {
    if (isMobile) setOpenMobile(false);
  }, [isMobile, setOpenMobile, pathname]);

  return (
    <Sidebar variant="floating">
      <SidebarHeader className="flex flex-row items-center gap-1 p-4 md:py-2">
        <LogoIcon className="size-5" />
        <Text color="custom" className="text-theme-accent font-bold">
          Photos
        </Text>
        <Text>admin</Text>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href={AdminRoute.index}>
                    <HomeIcon
                      className={clsx(
                        homeActive
                          ? "text-theme-accent"
                          : "text-muted-foreground",
                      )}
                    />
                    <Text className={clsx(homeActive && "font-medium")}>
                      Home
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
                    <ExternalLinkIcon className="text-muted-foreground" />
                    <Text>Visit site</Text>
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
                              active
                                ? "text-theme-accent"
                                : "text-muted-foreground",
                            )}
                          />
                          <Text className={clsx(active && "font-medium")}>
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
                  <Text>{user?.displayName}</Text>
                  <ChevronUpIcon className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <AdminAccountMenu className="w-[var(--radix-popper-anchor-width)]" />
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
