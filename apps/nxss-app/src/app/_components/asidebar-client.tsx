import { Protect } from "@clerk/nextjs";
import { HomeIcon, Layers, PlusCircle, Users2Icon } from "lucide-react";

import { Sidebar, SidebarBody, SidebarLabel } from "@nxss/ui/asidebar";
import { ScrollArea } from "@nxss/ui/scrollarea";

import { api } from "~/trpc/server";
import BranchListClient from "./branch-list-client";
import CreateBranchDailog from "./dailog/create-branch-dailog";
import { SidebarItemClient } from "./sidebar-item";
import SidebarSwitcher from "./sidebar-switcher";

export default async function AsideBarClient({
  params,
}: {
  params: { org: string; subject_id: string };
}) {
  const branchList = await api.branch.getBranchList();

  const hasAccordion = branchList.length > 0;

  console.log(params);

  return (
    <Sidebar>
      <SidebarSwitcher type="subject">
        <SidebarLabel>Subject Menu</SidebarLabel>
        
      </SidebarSwitcher>
      <SidebarSwitcher type="main">
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
        <SidebarBody className="flex flex-grow flex-col overflow-hidden">
          {/*  */}
          {hasAccordion ? (
            <Protect role="org:admin">
              <BranchListClient {...{ branchList }} />
            </Protect>
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
      </SidebarSwitcher>
    </Sidebar>
  );
}
