import { Protect } from "@clerk/nextjs";
import {
  BookIcon,
  Box,
  Calendar,
  CalendarIcon,
  GraduationCapIcon,
  HomeIcon,
  LayoutDashboard,
  Settings,
  SettingsIcon,
  Users2Icon,
  UsersIcon,
  UsersRound,
} from "lucide-react";

import {
  Sidebar,
  SidebarBody,
  SidebarItemWithSubmenu,
  SidebarLabel,
} from "@nxss/ui/asidebar";
import { ComboboxDemo } from "@nxss/ui/combobox";
import { VStack } from "@nxss/ui/stack";

import BackButton from "../button/back-button-client";
import { SidebarSwitcher } from "../switcher/sidebar-switcher";
import TestTypeClient from "../test-type-client";
import BranchAsidebarClient from "./branch-asidebar-client";
import { SidebarItemClient } from "./sidebar-item";
import { SubjectSidebarItem } from "./subject-sidebar-item";

export default async function AsideBarClient({
  params,
}: {
  params: {
    org: string;
    branch_id: string;
  };
}) {
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

      {/**Branch AsideBar */}
      <BranchAsidebarClient />

      <SidebarSwitcher type="subject">
        <VStack className="space-y-4 border-b pb-4">
          <ComboboxDemo />
        </VStack>

        <SidebarLabel>Subject Menu</SidebarLabel>
        <SidebarBody>
          <SubjectSidebarItem path={``} startsWith={false}>
            <LayoutDashboard className="size-4" /> Overview
          </SubjectSidebarItem>
          <SubjectSidebarItem path="/allocations">
            <UsersRound className="size-4" />
            Allocations
          </SubjectSidebarItem>
          <TestTypeClient params={params} />
          <SubjectSidebarItem path={`/settings`}>
            <Settings className="size-4" />
            Settings
          </SubjectSidebarItem>
        </SidebarBody>
      </SidebarSwitcher>

      <SidebarSwitcher type="main">
        <SidebarBody>
          <SidebarItemClient path={`/${params.org}/dashboard`}>
            <HomeIcon className="size-4" /> Dashboard
          </SidebarItemClient>
          <SidebarItemClient path={`/${params.org}/calendar`}>
            <Calendar className="size-4" /> Calendar
          </SidebarItemClient>

          <Protect role="org:admin">
            <SidebarItemClient path={`/${params.org}/faculty`}>
              <Users2Icon className="size-4" /> Faculty
            </SidebarItemClient>
          </Protect>
          <SidebarItemClient path={`/${params.org}/branch`}>
            <Box className="size-4" /> Branches
          </SidebarItemClient>
        </SidebarBody>
      </SidebarSwitcher>
    </Sidebar>
  );
}
