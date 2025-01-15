"use client";

import React from "react";
import Image from "next/image";
import { useOrganization } from "@clerk/nextjs";
import {
  CalendarIcon,
  GraduationCapIcon,
  LayoutDashboardIcon,
  PlusIcon,
  SettingsIcon,
} from "lucide-react";

import { SidebarItem } from "@nxss/ui/asidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@nxss/ui/avatar";
import { Button } from "@nxss/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@nxss/ui/card";
import { ScrollArea } from "@nxss/ui/scrollarea";
import { Separator } from "@nxss/ui/seperator";
import { Tabs, TabsList, TabsTrigger } from "@nxss/ui/tabs";

import CustomOrganizationSwitcher from "~/app/_components/switcher/organizatoin-switcher";

export function InstitutionBranchSidebar() {
  const { isLoaded, organization } = useOrganization();
  return (
    <ScrollArea>
      <div className="flex h-screen w-20 flex-col items-center border-r py-4">
        <div>
          {/* Logo Area */}
          <Image
            alt="Nexuss Logog"
            src={"/nexuss-logo.png"}
            height={38}
            width={38}
            quality={100}
            className="dark:invert"
          />
        </div>
        <div className="mt-10 flex flex-col items-center gap-4">
          <Avatar className="size-12 border-[3px] border-primary p-0.5">
            <AvatarImage
              src={organization?.imageUrl}
              className="rounded-full border border-border"
            />
            <AvatarFallback>{organization?.name.charAt(0)}</AvatarFallback>
          </Avatar>

          <Separator className="w-full" />

          <Button
            size={"icon"}
            className="size-12 rounded-full"
            variant={"secondary"}
          >
            <PlusIcon className="size-6" />
          </Button>
          <Avatar asChild>
            <Button
              size={"icon"}
              variant={"ghost"}
              className="size-12 border-2 border-border"
            >
              <AvatarImage src="https://github.com/kite.png" />
              <AvatarFallback>AE</AvatarFallback>
            </Button>
          </Avatar>
        </div>
      </div>
    </ScrollArea>
  );
}

export function BranchDetialsSidebar() {
  return (
    <ScrollArea className="h-screen border-r">
      <div className="h-fit w-60 space-y-7 px-4 pb-20 pt-4">
        <div className="text-lg font-semibold">Computer Science</div>

        {/**Active Semesters */}
        <div className="space-y-2">
          <p className="font-mono text-xs text-muted-foreground">
            ACTIVE SEMESTERS
          </p>
          <Tabs defaultValue="S1" value="S1">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="S1">S1</TabsTrigger>
              <TabsTrigger value="S2">S2</TabsTrigger>
              <TabsTrigger value="S3">S3</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/**Main Menu */}
        <div className="space-y-2">
          <p className="font-mono text-xs text-muted-foreground">MAIN MENU</p>
          <SidebarItem className="w-full items-start justify-start">
            <LayoutDashboardIcon strokeWidth={1.5} className="size-5" />{" "}
            Dashboard
          </SidebarItem>
          <SidebarItem>
            <GraduationCapIcon strokeWidth={1.5} className="size-5" /> Students
          </SidebarItem>

          <SidebarItem>
            <SettingsIcon strokeWidth={1.5} className="size-5" /> Settings
          </SidebarItem>
        </div>

        {/**Subjects */}
        <div className="space-y-2">
          <p className="font-mono text-xs text-muted-foreground">SUBJECTS</p>
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Add Subjects</CardTitle>
              <CardDescription className="text-xs">
                Create subjects of this semester to manage marks, attendance
                etc...
              </CardDescription>
            </CardHeader>
            <CardFooter>
              <Button className="w-full">Add</Button>
            </CardFooter>
          </Card>
        </div>

        {/**Section & Batches */}
        <div className="space-y-2">
          <p className="font-mono text-xs text-muted-foreground">
            SECTIONS & BATCHES
          </p>
          <Card>
            <CardHeader>
              <CardTitle className="text-base">
                Setup sections & batches
              </CardTitle>
              <CardDescription className="text-xs">
                Assign large number of students into small groups to manage
                efficiently
              </CardDescription>
            </CardHeader>
            <CardFooter>
              <Button className="w-full">Setup</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </ScrollArea>
  );
}

export function InstitutionDetailsSidebar() {
  return (
    <ScrollArea className="h-screen border-r">
      <div className="flex h-fit w-60 flex-col gap-7 px-4 pb-20 pt-4">
        <CustomOrganizationSwitcher />

        <div className="space-y-2">
          <p className="font-mono text-xs text-muted-foreground">MAIN MENU</p>
          <SidebarItem className="w-full items-start justify-start">
            <LayoutDashboardIcon strokeWidth={1.5} className="size-5" />{" "}
            Dashboard
          </SidebarItem>
          <SidebarItem>
            <CalendarIcon strokeWidth={1.5} className="size-5" /> Calendar
          </SidebarItem>

          <SidebarItem>
            <SettingsIcon strokeWidth={1.5} className="size-5" /> Settings
          </SidebarItem>
        </div>
      </div>
    </ScrollArea>
  );
}
