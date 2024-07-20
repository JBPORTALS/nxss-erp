"use client";

import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { Protect } from "@clerk/nextjs";
import { HomeIcon, Layers, PlusIcon, Users2Icon } from "lucide-react";

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

        <Protect role="org:admin">
          <Link href={`/${org}/faculty`}>
            <SidebarItem isActive={pathname.startsWith(`/${org}/faculty`)}>
              <Users2Icon className="size-4" /> Faculty
            </SidebarItem>
          </Link>
          <SidebarItem isActive={pathname.startsWith(`/${org}/subjects`)}>
            <Layers className="size-4" /> Subjects
          </SidebarItem>
        </Protect>
      </SidebarBody>
      <Protect role="org:admin">
        <SidebarLabel className="flex items-center justify-between pr-2">
          BRANCHES
          <Button size={"icon"} variant={"ghost"} className="size-8">
            <PlusIcon className="size-4" />
          </Button>
        </SidebarLabel>
      </Protect>
      <Protect role="org:staff">
        <SidebarLabel className="flex items-center justify-between pr-2">
          SUBJECTS
        </SidebarLabel>
      </Protect>
      <SidebarBody>
        <main className="pr-2">
          <div className="space-y-2 rounded-lg border bg-secondary/10 p-5">
            <Protect role="org:admin">
              <span className="text-sm font-semibold">No Branches</span>
              <p className="text-xs text-muted-foreground">
                Create new branch by clicking on the BRANCHES plus icon.
              </p>
            </Protect>
            <Protect role="org:staff">
              <span className="text-sm font-semibold">
                No Subjects Assigned
              </span>
              <p className="text-xs text-muted-foreground">
                Wait for subject allocation by your institution admin.
              </p>
            </Protect>
          </div>
        </main>
      </SidebarBody>
    </Sidebar>
  );
}
