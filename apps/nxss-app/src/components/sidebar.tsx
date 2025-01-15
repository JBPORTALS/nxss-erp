"use client";

import React from "react";
import Image from "next/image";
import {
  GraduationCapIcon,
  LayoutDashboardIcon,
  PlusIcon,
  RocketIcon,
  SettingsIcon,
} from "lucide-react";

import { SidebarItem } from "@nxss/ui/asidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@nxss/ui/avatar";
import { Button } from "@nxss/ui/button";
import { Separator } from "@nxss/ui/seperator";
import { Tabs, TabsList, TabsTrigger } from "@nxss/ui/tabs";

export function InstitutionBranchSidebar() {
  return (
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
            src="https://github.com/shadcn.png"
            className="rounded-full border border-border"
          />
          <AvatarFallback>SC</AvatarFallback>
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
  );
}

export function BranchDetialsSidebar() {
  return (
    <div className="flex h-screen w-60 flex-col gap-6 border-r px-4 py-4">
      <div className="text-lg font-semibold">Computer Science</div>

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

      <div className="space-y-2">
        <p className="font-mono text-xs text-muted-foreground">MAIN MENU</p>
        <SidebarItem className="w-full items-start justify-start">
          <LayoutDashboardIcon className="size-5" /> Dashboard
        </SidebarItem>
        <SidebarItem>
          <GraduationCapIcon className="size-5" /> Students
        </SidebarItem>

        <SidebarItem>
          <SettingsIcon className="size-5" /> Settings
        </SidebarItem>
      </div>

      <div className="space-y-2">
        <p className="font-mono text-xs text-muted-foreground">SUBJECTS</p>
      </div>

      <div className="space-y-2">
        <p className="font-mono text-xs text-muted-foreground">
          SECTIONS & BATCHES
        </p>
      </div>
    </div>
  );
}
