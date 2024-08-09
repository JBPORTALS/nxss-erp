import { Protect } from "@clerk/nextjs";
import {
  ArrowLeft,
  BookMarked,
  Files,
  HomeIcon,
  Layers,
  Layers2,
  LayoutDashboard,
  PlusCircle,
  Settings,
  Users2Icon,
  UsersRound,
} from "lucide-react";

import { Sidebar, SidebarBody, SidebarLabel } from "@nxss/ui/asidebar";
import { Button } from "@nxss/ui/button";
import { ComboboxDemo } from "@nxss/ui/combobox";
import { VStack } from "@nxss/ui/stack";

import { api } from "~/trpc/server";
import BackButton from "./back-button-client";
import BranchListClient from "./branch-list-client";
import CreateBranchDailog from "./dailog/create-branch-dailog";
import { SidebarItemClient } from "./sidebar-item";
import SidebarSwitcher from "./sidebar-switcher";
import { SubjectSidebarItem } from "./subject-sidebar-item";

export default async function AsideBarClient({
  params,
}: {
  params: {
    org: string;
    subject_id: string;
  };
}) {
  const branchList = await api.branch.getBranchList();

  const hasAccordion = branchList.length > 0;

  return (
    <Sidebar>
      <SidebarSwitcher type="setting" path={`/${params.org}/settings`}>
        <div className="pr-5">
          <BackButton />
        </div>
        <SidebarLabel>General</SidebarLabel>
        <SidebarBody>
          <SubjectSidebarItem path="/">
            <LayoutDashboard className="size-4" /> Overview
          </SubjectSidebarItem>
          <SubjectSidebarItem path="/">
            <UsersRound className="size-4" />
            Allocations
          </SubjectSidebarItem>
          <SubjectSidebarItem path={`/settings`}>
            <Settings className="size-4" />
            Settings
          </SubjectSidebarItem>
        </SidebarBody>
        <SidebarLabel>Institution</SidebarLabel>
        <SidebarBody>
          <SubjectSidebarItem path="">
            <LayoutDashboard className="size-4" /> Overview
          </SubjectSidebarItem>
          <SubjectSidebarItem path="/allocations">
            <UsersRound className="size-4" />
            Allocations
          </SubjectSidebarItem>
          <SubjectSidebarItem path={`/settings`}>
            <Settings className="size-4" />
            Settings
          </SubjectSidebarItem>
        </SidebarBody>
      </SidebarSwitcher>

      <SidebarSwitcher type="subject">
        <VStack className="space-y-4 border-b pb-4">
          <ComboboxDemo />
        </VStack>

        <SidebarLabel>Subject Menu</SidebarLabel>
        <SidebarBody>
          <SubjectSidebarItem path="">
            <LayoutDashboard className="size-4" /> Overview
          </SubjectSidebarItem>
          <SubjectSidebarItem path="/allocations">
            <UsersRound className="size-4" />
            Allocations
          </SubjectSidebarItem>
          <SubjectSidebarItem path={`/settings`}>
            <Settings className="size-4" />
            Settings
          </SubjectSidebarItem>
        </SidebarBody>
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

        <div className="space-y-1">
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
                <BranchListClient {...{ branchList, params }} />
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
        </div>
      </SidebarSwitcher>
    </Sidebar>
  );
}
