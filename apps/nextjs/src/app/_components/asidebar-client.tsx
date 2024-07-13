"use client";

import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { HomeIcon, PlusIcon, Users2Icon } from "lucide-react";

import {
  Sidebar,
  SidebarBody,
  SidebarItem,
  SidebarLabel,
} from "@nxss/ui/asidebar";
import { Button } from "@nxss/ui/button";

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
      <SidebarLabel className="flex items-center justify-between pr-2">
        BRANCHES
        <Button size={"icon"} variant={"ghost"} className="size-8">
          <PlusIcon />
        </Button>
      </SidebarLabel>
      <SidebarBody>
        <main className="pr-2">
          <div className="space-y-2 rounded-lg border bg-secondary/10 p-5">
            <span className="text-sm font-semibold">No Branches</span>
            <p className="text-xs text-muted-foreground">
              Create new branch by clicking on the BRANCHES plus icon.
            </p>
          </div>
        </main>
      </SidebarBody>
    </Sidebar>
  );
}
