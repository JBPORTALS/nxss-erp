import { Protect } from "@clerk/nextjs";
import { HomeIcon, Layers, PlusCircle, Users2Icon } from "lucide-react";

import { Sidebar, SidebarBody, SidebarLabel } from "@nxss/ui/asidebar";
import { NavItem } from "@nxss/ui/nav-item";
import {
  NavigationMenu,
  NavigationMenuButton,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuText,
} from "@nxss/ui/navigation-menu";

import { api } from "~/trpc/server";
import BranchListClient from "./branch-list-client";
import CreateBranchDailog from "./dailog/create-branch-dailog";
import { SidebarItemClient } from "./sidebar-item";

export default async function AsideBarClient({
  params,
}: {
  params: { org: string };
}) {
  const branchList = await api.branch.getBranchList();

  const hasAccordion = branchList.length > 0;

  return (
    <Sidebar>
      <SidebarLabel>MAIN MENU</SidebarLabel>
      <SidebarBody>
        <SidebarItemClient path={`/${params.org}/dashboard`}>
          <HomeIcon className="size-4" /> Dashboard
        </SidebarItemClient>

        <Protect role="org:admin">
          <SidebarItemClient path={`/${params.org}/faculty`}>
            <Users2Icon className="size-4" /> Faculty
          </SidebarItemClient>
        </Protect>
      </SidebarBody>
      <Protect role="org:admin">
        <SidebarLabel className="flex items-center justify-between pr-2">
          BRANCHES
          <CreateBranchDailog />
        </SidebarLabel>
      </Protect>
      <Protect role="org:staff">
        <SidebarLabel className="flex items-center justify-between pr-2">
          SUBJECTS
        </SidebarLabel>
      </Protect>
      <SidebarBody>
        {hasAccordion ? (
          <BranchListClient {...{ branchList }} />
        ) : (
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
        )}
      </SidebarBody>
    </Sidebar>
  );
}
