"use client";

import React from "react";
import { useParams } from "next/navigation";
import {
  BookIcon,
  CalendarIcon,
  GraduationCapIcon,
  HomeIcon,
  SettingsIcon,
  UsersIcon,
} from "lucide-react";

import {
  SidebarBody,
  SidebarItemWithSubmenu,
  SidebarLabel,
} from "@nxss/ui/asidebar";

import { SidebarSwitcher } from "../switcher/sidebar-switcher";
import { SidebarItemClient } from "./sidebar-item";

export default function BranchAsidebarClient() {
  const params = useParams();
  return (
    <SidebarSwitcher type="branch">
      <SidebarBody>
        <SidebarItemClient
          path={`/${params.org}/branches/${params.branch_id}/s/${params.semester_id}`}
          startsWith={false}
        >
          <HomeIcon className="h-4 w-4" />
          Home
        </SidebarItemClient>
        <SidebarItemClient
          path={`/${params.org}/branches/${params.branch_id}/s/${params.semester_id}/faculty`}
        >
          <UsersIcon className="h-4 w-4" />
          Faculty
        </SidebarItemClient>
        <SidebarItemWithSubmenu
          icon={<GraduationCapIcon className="h-4 w-4" />}
          label="Students"
        >
          <SidebarItemClient
            path={`/${params.org}/branches/${params.branch_id}/s/${params.semester_id}/students/profiles`}
          >
            Profiles
          </SidebarItemClient>
          <SidebarItemClient
            path={`/${params.org}/branches/${params.branch_id}/s/${params.semester_id}/students/sections-batches`}
          >
            Sections & Batches
          </SidebarItemClient>
        </SidebarItemWithSubmenu>

        <SidebarLabel>Semester</SidebarLabel>
        <SidebarItemClient
          path={`/${params.org}/branches/${params.branch_id}/s/${params.semester_id}/subjects`}
        >
          <BookIcon className="h-4 w-4" />
          Subjects
        </SidebarItemClient>
        <SidebarItemClient
          path={`/${params.org}/branches/${params.branch_id}/s/${params.semester_id}/exam-schedule`}
        >
          <CalendarIcon className="h-4 w-4" />
          Exam Schedule
        </SidebarItemClient>

        <SidebarLabel>Configuration</SidebarLabel>
        <SidebarItemClient
          path={`/${params.org}/branches/${params.branch_id}/s/${params.semester_id}/settings`}
        >
          <SettingsIcon className="h-4 w-4" />
          Settings
        </SidebarItemClient>
      </SidebarBody>
    </SidebarSwitcher>
  );
}
