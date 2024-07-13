"use client";

import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { HomeIcon, Users2Icon } from "lucide-react";

import {
  Sidebar,
  SidebarBody,
  SidebarItem,
  SidebarLabel,
} from "@nxss/ui/asidebar";

export default function AsideBarClient() {
  const { org } = useParams();
  const pathname = usePathname();
  return (
    <Sidebar>
      <SidebarLabel>MAIN MENU</SidebarLabel>
      <SidebarBody>
        <Link href={`/${org}/dashboard`}>
          <SidebarItem isActive={pathname.startsWith(`/${org}/dashboard`)}>
            <HomeIcon className="size-4" /> Dashboard
          </SidebarItem>
        </Link>
        <Link href={`/${org}/faculty`}>
          <SidebarItem isActive={pathname.startsWith(`/${org}/faculty`)}>
            <Users2Icon className="size-4" /> Faculty
          </SidebarItem>
        </Link>
      </SidebarBody>
      <SidebarLabel>BRANCHES</SidebarLabel>
      <SidebarBody></SidebarBody>
    </Sidebar>
  );
}
