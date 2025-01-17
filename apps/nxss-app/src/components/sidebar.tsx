"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams, usePathname, useRouter } from "next/navigation";
import { useOrganization } from "@clerk/nextjs";
import { GraduationCapIcon, LayoutDashboardIcon, PlusIcon } from "lucide-react";

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
              onClick={() => router.push(`/${params.orgId}/dashboard`)}
              size={"icon"}
              variant={"ghost"}
              className={cn(
                "size-12 border-2 border-border",
                [`/${params.orgId}/dashboard`].includes(pathname)
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
              <Tooltip key={branch.id}>
                <TooltipTrigger asChild>
                  <Avatar asChild>
                    <Button
                      onClick={() =>
                        router.push(
                          `/${params.orgId}/branches/${branch.id}/${branch.Semesters.at(0)?.id}/dashboard`,
                        )
                      }
                      size={"icon"}
                      variant={"ghost"}
                      className={cn(
                        "size-12 border-2 border-border",
                        pathname.startsWith(
                          `/${params.orgId}/branches/${branch.id}`,
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
  const pathname = usePathname();
  const params = useParams<{
    branchId: string;
    orgId: string;
    semesterId: string;
  }>();
  const { data, isLoading: isBranchDataLoading } =
    api.branch.getDetails.useQuery(
      { id: params.branchId },
      { enabled: !!params.branchId },
    );
  return (
    <ScrollArea className="relative h-full border-r">
      <nav className="h-fit w-72 space-y-7 px-5 pb-20 pt-4">
        <div className="inline-block bg-gradient-to-t from-foreground/70 to-foreground bg-clip-text text-lg font-extrabold text-transparent">
          {isBranchDataLoading ? <Skeleton className="h-4 w-40" /> : data?.name}
        </div>

        {/**Active Semesters */}
        <div className="space-y-2">
          <p className="pl-2 font-mono text-xs text-muted-foreground">
            ACTIVE SEMESTERS
          </p>
          <Tabs defaultValue={params.semesterId} value={params.semesterId}>
            <TabsList className="w-full">
              {data?.Semesters.map((semester) => (
                <TabsTrigger className="w-full" asChild value={semester.id}>
                  <Link
                    href={`/${params.orgId}/branches/${params.branchId}/${semester.id}/dashboard`}
                  >
                    S{semester.number}
                  </Link>
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        {/**Main Menu */}
        <div className="flex flex-col gap-2">
          <p className="pl-2 font-mono text-xs text-muted-foreground">
            MAIN MENU
          </p>
          <Link
            href={`/${params.orgId}/branches/${params.branchId}/${params.semesterId}/dashboard`}
          >
            <SidebarItem
              isActive={pathname.startsWith(
                `/${params.orgId}/branches/${params.branchId}/${params.semesterId}/dashboard`,
              )}
              className="w-full items-start justify-start"
            >
              <LayoutDashboardIcon strokeWidth={1.5} className="size-5" />{" "}
              Dashboard
            </SidebarItem>
          </Link>
          <Link
            href={`/${params.orgId}/branches/${params.branchId}/${params.semesterId}/students`}
          >
            <SidebarItem
              isActive={pathname.startsWith(
                `/${params.orgId}/branches/${params.branchId}/${params.semesterId}/students`,
              )}
            >
              <GraduationCapIcon strokeWidth={1.5} className="size-5" />{" "}
              Students
            </SidebarItem>
          </Link>
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
      <nav className="flex h-fit w-72 flex-col gap-7 px-5 pb-20 pt-4">
        <div className="flex flex-col gap-2">
          <p className="pl-2 font-mono text-xs text-muted-foreground">
            MAIN MENU
          </p>
          <Link href={`/${params.org}/dashboard`}>
            <SidebarItem
              isActive={pathname.startsWith(`/${params.orgId}/dashboard`)}
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
