import Link from "next/link";
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
import { VStack } from "@nxss/ui/stack";

import { api } from "~/trpc/server";
import BranchListClient from "./branch-list-client";
import { ComboboxDemo } from "./combobox";
import CreateBranchDailog from "./dailog/create-branch-dailog";
import { SidebarItemClient } from "./sidebar-item";
import SidebarSwitcher from "./sidebar-switcher";

export default async function AsideBarClient({
  params,
}: {
  params: {
    org: string;
    subject_id: string;
    branch_id: string;
    sem_id: string;
  };
}) {
  const branchList = await api.branch.getBranchList();

  const hasAccordion = branchList.length > 0;

  console.log(params);

  return (
    <Sidebar>
      <SidebarSwitcher type="subject">
        <SidebarLabel>Subject Menu</SidebarLabel>
        <VStack className="space-y-4 border-b pb-4">
          <ComboboxDemo />

          <Link
            href={`/${params.org}/dashboard`}
            className="flex gap-3 font-medium"
          >
            <ArrowLeft />
            Back to Dashboard{" "}
          </Link>
        </VStack>
        <SidebarItemClient path={``}>
          <LayoutDashboard className="size-4" /> Overview
        </SidebarItemClient>
        <SidebarItemClient path={`#`}>
          <UsersRound className="size-4" />
          Allocations
        </SidebarItemClient>
        <SidebarItemClient path={`#`}>
          <Files className="size-4" />
          Notes
        </SidebarItemClient>
        <SidebarItemClient path={`#`}>
          <Layers2 className="size-4" />
          Assignments
        </SidebarItemClient>
        <SidebarItemClient path={`#`}>
          <BookMarked className="size-4" />
          Marks
        </SidebarItemClient>
        <SidebarItemClient path={`#`}>
          <Settings className="size-4" />
          Settings
        </SidebarItemClient>
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
