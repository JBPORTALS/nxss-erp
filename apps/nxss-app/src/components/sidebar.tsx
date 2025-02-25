"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, usePathname, useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
import {
  GraduationCapIcon,
  LayoutDashboardIcon,
  LogOutIcon,
  PlusIcon,
  SettingsIcon,
  Table2Icon,
  Users2Icon,
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

import { api } from "~/trpc/react";
import { useLocalOrganization } from "~/utils/hooks";
import CreateBranchDailog from "./create-branch-dailog";
import CreateSubjectDailog from "./create-subject-dialog";
import { InstitutionSwitcher } from "./institution-switcher";
import { ThemeToggle } from "./theme-toggle";

function BranchList() {
  const params = useParams();
  const { data, isLoading } = api.branches.getBranchList.useQuery({
    orgId: params.orgId,
  });
  const pathname = usePathname();
  const router = useRouter();
  const utils = api.useUtils();

  if (isLoading)
    return Array.from({ length: 6 })
      .fill(0)
      .map((_, i) => <Skeleton key={i} className="size-10 rounded-full" />);

  if (data?.length === 0)
    return (
      <p className="rotate-180 font-mono text-sm tracking-[0.3rem] text-muted-foreground [writing-mode:vertical-lr]">
        NO BRANCHES | CREATE ONE HERE
      </p>
    );

  return (
    <React.Fragment>
      {data?.flatMap((branch) => {
        utils.branches.getDetails.prefetch({ id: branch.id.toString() });

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
                    "size-10 border-2 border-border",
                    pathname.startsWith(
                      `/${params.orgId}/branches/${branch.id}`,
                    )
                      ? "border-2 border-primary p-0.5"
                      : "active:scale-95",
                  )}
                >
                  <AvatarImage src="https://github.com/kite" />
                  <AvatarFallback className="bg-gradient-to-r from-primary/10 to-background capitalize">
                    {branch.title.split(" ")[0]?.charAt(0)}
                    {branch.title.split(" ")[1]?.charAt(0)}
                  </AvatarFallback>
                </Button>
              </Avatar>
            </TooltipTrigger>
            <TooltipContent side={"right"}>{branch.title}</TooltipContent>
          </Tooltip>
        );
      })}
    </React.Fragment>
  );
}
function SubjectList() {
  const params = useParams();
  const { data, isLoading } = api.subjects.getAll.useQuery({
    semesterId: params.semesterId,
  });
  const pathname = usePathname();
  const router = useRouter();
  const utils = api.useUtils();

  if (isLoading)
    return Array.from({ length: 4 })
      .fill(0)
      .map((_, i) => <Skeleton key={i} className="h-9 w-full" />);

  if (data?.length === 0)
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Add Subjects</CardTitle>
          <CardDescription className="text-xs">
            Create subjects of this semester to manage marks, attendance etc...
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <CreateSubjectDailog>
            <Button variant={"outline"} className="w-full">
              Add
            </Button>
          </CreateSubjectDailog>
        </CardFooter>
      </Card>
    );

  return (
    <React.Fragment>
      {data?.flatMap((subject) => {
        utils.subjects.getById.prefetch({ subjectId: subject.id });

        return (
          <Link
            key={subject.id}
            href={`/${params.orgId}/branches/${params.branchId}/${params.semesterId}/subjects/${subject.id}`}
          >
            <SidebarItem
              isActive={pathname.startsWith(
                `/${params.orgId}/branches/${params.branchId}/${params.semesterId}/subjects/${subject.id}`,
              )}
            >
              {subject.title}
            </SidebarItem>
          </Link>
        );
      })}
    </React.Fragment>
  );
}

export function InstitutionBranchSidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const organization = useLocalOrganization();
  const { signOut } = useAuth();

  const [isSigningOut, setSigningOut] = useState(false);

  async function handleSignOut() {
    setSigningOut(true);
    await signOut();
    setSigningOut(false);
  }

  return (
    <ScrollArea className="relative flex h-full flex-col border-r">
      <nav className="relative flex w-16 flex-col items-center py-4">
        <div>
          {/* Logo Area */}
          <Image
            alt="Nexuss Logog"
            src={"/nexuss-logo.png"}
            height={32}
            width={32}
            quality={100}
            className="dark:invert"
          />
        </div>
        <div className="mt-10 flex flex-col items-center gap-4">
          <Avatar asChild>
            <Button
              onClick={() => router.push(`/${params.orgId}/dashboard`)}
              size={"icon"}
              variant={"ghost"}
              className={cn(
                "size-10 border-2 border-border",
                [`/${params.orgId}/dashboard`].includes(pathname)
                  ? "border-2 border-primary p-0.5"
                  : "active:scale-95",
              )}
            >
              <AvatarImage
                src={organization?.imageUrl}
                className="rounded-full border border-border"
              />
              <AvatarFallback>{organization?.name?.charAt(0)}</AvatarFallback>
            </Button>
          </Avatar>

          <Separator className="w-full" />

          <Tooltip>
            <CreateBranchDailog>
              <TooltipTrigger asChild>
                <Button
                  size={"icon"}
                  className="size-10 rounded-full"
                  variant={"outline"}
                >
                  <PlusIcon strokeWidth={1} className="size-6" />
                </Button>
              </TooltipTrigger>
            </CreateBranchDailog>
            <TooltipContent side="right" align="center">
              Create Branch
            </TooltipContent>
          </Tooltip>
          <BranchList />
        </div>
      </nav>
      <div className="absolute bottom-0 flex w-full flex-col items-center gap-4 py-4">
        <ThemeToggle />
        <Button
          isLoading={isSigningOut}
          loadingText=" "
          variant={"outline"}
          size={"icon"}
          onClick={() => handleSignOut()}
          className="size-10 rounded-full bg-input"
        >
          <LogOutIcon className="size-[1.2rem]" />
        </Button>
      </div>
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
    api.branches.getDetails.useQuery(
      { id: params.branchId },
      { enabled: !!params.branchId },
    );
  return (
    <ScrollArea className="relative h-full border-r">
      <nav className="h-fit w-64 space-y-7 px-5 pb-20 pt-4">
        <div className="inline-block w-full bg-gradient-to-t from-foreground/70 to-foreground bg-clip-text text-lg font-bold text-transparent">
          {isBranchDataLoading ? (
            <div className="animate-random-width mt-1 w-full">
              <Skeleton className="h-4 w-full" />
            </div>
          ) : (
            data?.title
          )}
        </div>

        {/**Active Semesters */}
        <div className="space-y-2">
          <p className="pl-2 font-mono text-xs text-muted-foreground/80">
            ACTIVE SEMESTERS
          </p>
          <Tabs defaultValue={params.semesterId} value={params.semesterId}>
            <TabsList className="w-full">
              {data?.Semesters.map((semester) => (
                <TabsTrigger
                  key={semester.id}
                  className="w-full"
                  asChild
                  value={semester.id}
                >
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
          <p className="pl-2 font-mono text-xs text-muted-foreground/80">
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

          <Link
            href={`/${params.orgId}/branches/${params.branchId}/${params.semesterId}/time-table`}
          >
            <SidebarItem
              isActive={pathname.startsWith(
                `/${params.orgId}/branches/${params.branchId}/${params.semesterId}/time-table`,
              )}
            >
              <Table2Icon strokeWidth={1.5} className="size-5" /> Time Table
            </SidebarItem>
          </Link>
          {/* <Link
            href={`/${params.orgId}/branches/${params.branchId}/${params.semesterId}/subjects`}
          >
            <SidebarItem
              isActive={pathname.startsWith(
                `/${params.orgId}/branches/${params.branchId}/${params.semesterId}/subjects`,
              )}
            >
              <BookAIcon strokeWidth={1.5} className="size-5" /> Subjects
            </SidebarItem>
          </Link> */}
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <p className="pl-2 font-mono text-xs text-muted-foreground/80">
              SUBJECTS
            </p>
            <Tooltip>
              <CreateSubjectDailog>
                <TooltipTrigger asChild>
                  <Button variant={"outline"} className="size-7" size={"icon"}>
                    <PlusIcon className="size-4" />
                  </Button>
                </TooltipTrigger>
              </CreateSubjectDailog>
              <TooltipContent side={"right"}>Add Subject</TooltipContent>
            </Tooltip>
          </div>
          <SubjectList />
        </div>
        {/* <div className="space-y-2">
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
              <Button variant={"outline"} className="w-full">
                Setup
              </Button>
            </CardFooter>
          </Card>
        </div>  */}
      </nav>
    </ScrollArea>
  );
}

export function InstitutionDetailsSidebar() {
  const pathname = usePathname();
  const params = useParams();
  return (
    <ScrollArea className="relative h-full border-r">
      <nav className="flex h-fit w-64 flex-col gap-7 px-5 pb-20 pt-4">
        <InstitutionSwitcher />
        <div className="flex flex-col gap-2">
          <p className="pl-2 font-mono text-xs text-muted-foreground">
            MAIN MENU
          </p>
          <Link href={`/${params.orgId}/dashboard`}>
            <SidebarItem
              isActive={pathname.startsWith(`/${params.orgId}/dashboard`)}
              className="w-full items-start justify-start"
            >
              <LayoutDashboardIcon strokeWidth={1.5} className="size-5" />{" "}
              Dashboard
            </SidebarItem>
          </Link>

          <SidebarItem>
            <Users2Icon strokeWidth={1.5} className="size-5" /> Faculty
          </SidebarItem>

          <SidebarItem>
            <SettingsIcon strokeWidth={1.5} className="size-5" /> Settings
          </SidebarItem>
        </div>
      </nav>
    </ScrollArea>
  );
}
