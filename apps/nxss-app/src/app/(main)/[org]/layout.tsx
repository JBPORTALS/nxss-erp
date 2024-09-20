import { notFound } from "next/navigation";
import { OrganizationSwitcher } from "@clerk/nextjs";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { RocketIcon, SlashIcon } from "lucide-react";

import { cn } from "@nxss/ui";
import { Button } from "@nxss/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@nxss/ui/select";

import { BreadcrumbNavbar } from "~/app/_components/breadcrumb";
import NavbarItems from "~/app/_components/navbar-client-item";
import ProfilePopover from "~/app/_components/popovers/profile-popover";
import AsideBarClient from "~/app/_components/sidebar/asidebar-client";
import CustomOrganizationSwitcher from "~/app/_components/switcher/organizatoin-switcher";

export default async function Templates(props: {
  children: React.ReactNode;
  params: { org: string; branch_id: string };
}) {
  return (
    <div className="h-screen w-full">
      <div className="sticky inset-0 z-40 flex flex-col">
        <header className="relative flex h-[64px] items-center justify-between border-b bg-background/80 px-5 py-2.5 backdrop-blur-md">
          <div className="flex items-center gap-2">
            <Button
              size={"icon"}
              className="size-9 overflow-hidden rounded-full border border-border shadow-none"
            >
              <RocketIcon className="size-5" />
            </Button>
            <div className="flex items-center gap-2">
              <SlashIcon className="size-4 -rotate-12 text-muted-foreground/40" />
              <CustomOrganizationSwitcher />
              {/* <SlashIcon className="size-4 text-muted-foreground/40" /> */}
              {/* <Select value="2024">
                <SelectTrigger
                  className={cn(
                    "w-fit border-none px-2 font-semibold shadow-none outline-none hover:bg-accent",
                  )}
                >
                  <SelectValue placeholder="Select Academic Year" />
                </SelectTrigger>
                <SelectContent className="p-2 text-base">
                  <SelectItem value="2024">Year 2024</SelectItem>
                  <SelectItem value="2023">Year 2023</SelectItem>
                  <SelectItem value="2022">Year 2022</SelectItem>
                </SelectContent>
              </Select> */}

              <NavbarItems />
            </div>
          </div>

          <ProfilePopover params={props.params} />
        </header>
        <BreadcrumbNavbar />
      </div>

      <section className="flex h-full flex-1">
        <AsideBarClient params={props.params} />
        <main className="min-h-full w-full">{props.children}</main>
      </section>
    </div>
  );
}
