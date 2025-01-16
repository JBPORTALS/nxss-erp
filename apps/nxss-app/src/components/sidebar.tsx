"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, usePathname, useRouter } from "next/navigation";
import { useOrganization } from "@clerk/nextjs";
import {
  CalendarIcon,
  GraduationCapIcon,
  LayoutDashboardIcon,
  PlusIcon,
  SettingsIcon,
} from "lucide-react";

import { cn } from "@nxss/ui";
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
import { Skeleton } from "@nxss/ui/skeleton";
import { Tabs, TabsList, TabsTrigger } from "@nxss/ui/tabs";
import { Tooltip, TooltipContent, TooltipTrigger } from "@nxss/ui/tooltip";

import CustomOrganizationSwitcher from "~/app/_components/switcher/organizatoin-switcher";
import { api } from "~/trpc/react";
import CreateBranchDailog from "./create-branch-dailog";

export function InstitutionBranchSidebar() {
  const { isLoaded, organization } = useOrganization();
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const { data, isLoading } = api.branch.getBranchList.useQuery();
  const utils = api.useUtils();
  return (
    <ScrollArea className="relative h-full border-r">
      <nav className="flex w-20 flex-col items-center py-4">
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
          <Avatar asChild className="size-12">
            <Button
              onClick={() => router.push(`/${params.org}/dashboard`)}
              size={"icon"}
              variant={"ghost"}
              className={cn(
                "size-12 border-2 border-border",
                [`/${params.org}/dashboard`].includes(pathname)
                  ? "border-2 border-primary p-0.5"
                  : "active:scale-95",
              )}
            >
              <AvatarImage
                src={organization?.imageUrl}
                className="rounded-full border border-border"
              />
              <AvatarFallback>{organization?.name.charAt(0)}</AvatarFallback>
            </Button>
          </Avatar>

          <Separator className="w-full" />

          <CreateBranchDailog>
            <Button
              size={"icon"}
              className="size-12 rounded-full"
              variant={"secondary"}
            >
              <PlusIcon className="size-6" />
            </Button>
          </CreateBranchDailog>
          {data?.length === 0 && (
            <p className="rotate-180 font-mono text-sm tracking-[0.3rem] text-muted-foreground [writing-mode:vertical-lr]">
              NO BRANCHES | CREATE ONE HERE
            </p>
          )}
          {data?.flatMap((branch) => {
            utils.branch.getDetails.prefetch({ id: branch.id.toString() });

            return (
              <Tooltip>
                <TooltipTrigger>
                  <Avatar asChild>
                    <Button
                      onClick={() =>
                        router.push(`/${params.org}/branches/${branch.id}`)
                      }
                      size={"icon"}
                      variant={"ghost"}
                      className={cn(
                        "size-12 border-2 border-border",
                        pathname.startsWith(
                          `/${params.org}/branches/${branch.id}`,
                        )
                          ? "border-2 border-primary p-0.5"
                          : "active:scale-95",
                      )}
                    >
                      <AvatarImage src="https://github.com/kite" />
                      <AvatarFallback className="capitalize">
                        {branch.name.split(" ")[0]?.charAt(0)}
                        {branch.name.split(" ")[1]?.charAt(0)}
                      </AvatarFallback>
                    </Button>
                  </Avatar>
                </TooltipTrigger>
                <TooltipContent side={"right"}>{branch.name}</TooltipContent>
              </Tooltip>
            );
          })}
        </div>
      </nav>
    </ScrollArea>
  );
}

export function BranchDetialsSidebar() {
  const params = useParams<{ branch_id: string }>();
  const { data, isLoading: isBranchDataLoading } =
    api.branch.getDetails.useQuery({ id: params.branch_id });
  return (
    <ScrollArea className="relative h-full border-r">
      <nav className="h-fit w-60 space-y-7 px-4 pb-20 pt-4">
        <div className="text-lg font-semibold">
          {isBranchDataLoading ? <Skeleton className="h-4 w-40" /> : data?.name}
        </div>

        {/**Active Semesters */}
        <div className="space-y-2">
          <p className="pl-2 font-mono text-xs text-muted-foreground">
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
          <p className="pl-2 font-mono text-xs text-muted-foreground">
            MAIN MENU
          </p>
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
          <p className="pl-2 font-mono text-xs text-muted-foreground">
            SUBJECTS
          </p>
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
          <p className="pl-2 font-mono text-xs text-muted-foreground">
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
      </nav>
    </ScrollArea>
  );
}

export function InstitutionDetailsSidebar() {
  const pathname = usePathname();
  const params = useParams();
  return (
    <ScrollArea className="relative h-full border-r">
      <nav className="flex h-fit w-60 flex-col gap-7 px-4 pb-20 pt-4">
        <CustomOrganizationSwitcher />

        <div className="flex flex-col gap-2">
          <p className="pl-2 font-mono text-xs text-muted-foreground">
            MAIN MENU
          </p>
          <Link href={`/${params.org}/dashboard`}>
            <SidebarItem
              isActive={pathname.startsWith(`/${params.org}/dashboard`)}
              className="w-full items-start justify-start"
            >
              <LayoutDashboardIcon strokeWidth={1.5} className="size-5" />{" "}
              Dashboard
            </SidebarItem>
          </Link>

          {/* <Link href={`/${params.org}/calendar`}>
            <SidebarItem
              isActive={pathname.startsWith(`/${params.org}/calendar`)}
            >
              <CalendarIcon strokeWidth={1.5} className="size-5" /> Calendar
            </SidebarItem>
          </Link>

          <SidebarItem>
            <SettingsIcon strokeWidth={1.5} className="size-5" /> Settings
          </SidebarItem> */}
        </div>
      </nav>
    </ScrollArea>
  );
}
