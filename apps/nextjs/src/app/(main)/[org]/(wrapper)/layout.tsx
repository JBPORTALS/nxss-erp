import Link from "next/link";
import { OrganizationSwitcher, UserButton } from "@clerk/nextjs";
import { clerkClient } from "@clerk/nextjs/server";
import {
  DotIcon,
  HomeIcon,
  PlusIcon,
  RocketIcon,
  Users2Icon,
} from "lucide-react";

import { cn } from "@nxss/ui";
import {
  Sidebar,
  SidebarBody,
  SidebarItem,
  SidebarLabel,
} from "@nxss/ui/asidebar";
import { Button } from "@nxss/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@nxss/ui/select";
import { ThemeToggle } from "@nxss/ui/theme";

export default async function Template(props: {
  children: React.ReactNode;
  params: { org: string };
}) {
  const org = await clerkClient().organizations.getOrganization({
    slug: props.params.org,
  });

  return (
    <div className="flex min-h-screen w-full flex-col">
      <div className="sticky inset-0 z-40 flex flex-col">
        <header className="relative flex items-center justify-between border-b bg-background/80 px-5 py-3.5 backdrop-blur-sm">
          <div className="flex items-center gap-4">
            <Button
              size={"icon"}
              className="size-10 overflow-hidden rounded-full border border-border shadow-none"
            >
              <RocketIcon className="size-6" />
            </Button>
            <div className="flex items-center gap-1">
              <OrganizationSwitcher />
              <DotIcon className="size-6 text-muted-foreground/80" />
              <Select value="2024">
                <SelectTrigger
                  className={cn(
                    "w-fit border-none px-2 text-base font-semibold shadow-none outline-none",
                  )}
                >
                  <SelectValue placeholder="Select Academic Year" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2024">2024-25</SelectItem>
                  <SelectItem value="2023">2023-24</SelectItem>
                  <SelectItem value="2022">2022-21</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex items-center gap-4">
            {/* <Button variant={"outline"}>As a Staff</Button> */}
            <ThemeToggle />
            <UserButton />
          </div>
        </header>
      </div>
      <section className="flex flex-1">
        <Sidebar>
          <SidebarLabel>MAIN MENU</SidebarLabel>
          <SidebarBody>
            <SidebarItem>
              <HomeIcon className="size-4" /> Dashboard
            </SidebarItem>
            <SidebarItem>
              <Users2Icon className="size-4" /> Faculty
            </SidebarItem>
          </SidebarBody>
        </Sidebar>
        {/* <aside className="sticky inset-0 w-[280px] shrink-0 border-r py-5">
          <nav className="flex flex-col gap-3 pl-5">
            <span className="text-xs font-semibold text-muted-foreground">
              MAIN MENU
            </span>
            <Link href={`/${props.params.org}/dashboard`}>
              <Button
                variant={"ghost"}
                className={cn(
                  "w-full justify-start rounded-e-none border-r-2 border-purple-600 bg-accent",
                )}
              >
                <HomeIcon className="size-4" /> Dashboard
              </Button>
            </Link>
            <Link href={`/${props.params.org}/faculty`}>
              <Button
                variant={"ghost"}
                className={cn(
                  "w-full justify-start rounded-e-none text-muted-foreground",
                )}
              >
                <Users2Icon className="size-4" /> Faculty
              </Button>
            </Link>
            <div className="flex items-center justify-between pr-2">
              <span className="text-xs font-semibold text-muted-foreground">
                BRANCHES{" "}
              </span>
              <Button variant={"ghost"} size={"icon"}>
                <PlusIcon className="size-5" />
              </Button>
            </div>
            <main className="pr-2">
              <div className="space-y-2 rounded-lg border bg-secondary/10 p-5">
                <span className="font-semibold">No Branches</span>
                <p className="text-sm text-muted-foreground">
                  Create new branch by clicking on the BRANCHES plus icon.
                </p>
              </div>
            </main>
          </nav>
        </aside> */}
        <main className="px-10 py-8">{props.children}</main>
      </section>
    </div>
  );
}
