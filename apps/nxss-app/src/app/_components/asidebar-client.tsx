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
  Plus,
  PlusCircle,
  Settings,
  Users2Icon,
  UsersRound,
} from "lucide-react";

import { Sidebar, SidebarBody, SidebarLabel } from "@nxss/ui/asidebar";
import { Button } from "@nxss/ui/button";
import { ComboboxDemo } from "@nxss/ui/combobox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@nxss/ui/dialog";
import { Input } from "@nxss/ui/input";
import { Label } from "@nxss/ui/label";
import { VStack } from "@nxss/ui/stack";

import { api } from "~/trpc/server";
import BackButton from "./back-button-client";
import SectionListClient from "./branch-list-client";
import { BranchSidebarItem } from "./branch-sidebar-item";
import { SidebarItemClient } from "./sidebar-item";
import SidebarSwitcher from "./sidebar-switcher";
import { SubjectSidebarItem } from "./subject-sidebar-item";

export default async function AsideBarClient({
  params,
}: {
  params: {
    org: string;
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

      <SidebarSwitcher type="branch">
        <div className="pr-5">
          <Link href={`/${params.org}/branch`}>
            <Button
              variant={"ghost"}
              className="w-full justify-start text-sm text-accent-foreground/60 hover:border-accent-foreground/50"
            >
              <ArrowLeft className="size-5" />
              Back
            </Button>
          </Link>
        </div>
        <SidebarLabel>Branch</SidebarLabel>
        <SidebarBody>
          <BranchSidebarItem startsWith={false} path={``}>
            <LayoutDashboard className="size-4" /> Overview
          </BranchSidebarItem>
          <BranchSidebarItem path={`/faculty`}>
            <UsersRound className="size-4" /> Faculty
          </BranchSidebarItem>
          <BranchSidebarItem path="/students">
            <UsersRound className="size-4" />
            Students
          </BranchSidebarItem>
          <BranchSidebarItem path={`/settings`}>
            <Settings className="size-4" />
            Settings
          </BranchSidebarItem>
        </SidebarBody>
        <SidebarLabel>Semester</SidebarLabel>
        <SidebarBody>
          <BranchSidebarItem path={`/1`} startsWith={false}>
            <LayoutDashboard className="size-4" /> Overview
          </BranchSidebarItem>

          <BranchSidebarItem path={`/1/subjects`}>
            <UsersRound className="size-4" />
            Subjects
          </BranchSidebarItem>
          <BranchSidebarItem path={`/1/exam-schedule`}>
            <LayoutDashboard className="size-4" /> Exam Schedule
          </BranchSidebarItem>
          <BranchSidebarItem path={`/1/settings`}>
            <Settings className="size-4" />
            Settings
          </BranchSidebarItem>
        </SidebarBody>
        <SidebarBody>
          <SidebarLabel className="flex justify-between">
            Section
            <Dialog>
              <DialogTrigger asChild>
                <Plus className="mr-4 size-4 hover:cursor-pointer" />
              </DialogTrigger>
              <DialogContent className="gap-6 p-6 sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Create Section</DialogTitle>
                  <DialogDescription>
                    Organization and Scheduling of Classes and Groups.
                  </DialogDescription>
                </DialogHeader>
                <VStack className="gap-6">
                  <VStack className="w-full gap-2">
                    <Label htmlFor="name" className="text-right text-xs">
                      Section Name
                    </Label>
                    <Input id="name" placeholder="Section Name" />
                  </VStack>
                  <VStack className="w-full gap-2">
                    <Label htmlFor="number" className="text-right text-xs">
                      No. of Batches
                    </Label>
                    <Input id="number" placeholder="No. of Batches" />
                  </VStack>
                </VStack>
                <DialogFooter>
                  <Button type="submit">Save changes</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </SidebarLabel>
        </SidebarBody>
        <SidebarBody className="flex flex-grow flex-col overflow-hidden">
          {/*  */}
          {hasAccordion ? (
            <Protect role="org:admin">
              <SectionListClient branchList={branchList} params={params} />
            </Protect>
          ) : (
            <main className="pr-2">
              <div className="space-y-2 rounded-lg border bg-secondary/10 p-5">
                <Protect role="org:admin">
                  <span className="text-sm font-semibold">No Section</span>
                  <p className="text-xs text-muted-foreground">
                    Create new Section by clicking on the Section plus icon.
                  </p>
                </Protect>
              </div>
            </main>
          )}
        </SidebarBody>
      </SidebarSwitcher>

      <SidebarSwitcher type="subject">
        <VStack className="space-y-4 border-b pb-4">
          <ComboboxDemo />
        </VStack>

        <SidebarLabel>Subject Menu</SidebarLabel>
        <SidebarBody>
          <SubjectSidebarItem path={`/${params.org}/dashboard`}>
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
          <SidebarItemClient path={`/${params.org}/branch`}>
            <HomeIcon className="size-4" /> Branch
          </SidebarItemClient>
        </SidebarBody>
      </SidebarSwitcher>
    </Sidebar>
  );
}
