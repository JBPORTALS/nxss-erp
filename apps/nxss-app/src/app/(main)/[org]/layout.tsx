import React from "react";
import { RocketIcon, SlashIcon } from "lucide-react";

import { Button } from "@nxss/ui/button";

import { BreadcrumbNavbar } from "~/app/_components/breadcrumb";
import NavbarItems from "~/app/_components/navbar-client-item";
import ProfilePopover from "~/app/_components/popovers/profile-popover";
import AsideBarClient from "~/app/_components/sidebar/asidebar-client";
import Switchers from "~/app/_components/switcher";
import CustomOrganizationSwitcher from "~/app/_components/switcher/organizatoin-switcher";
import SemesterSwitcher from "~/app/_components/switcher/semester-switcher";

export default async function Templates(props: {
  children: React.ReactNode;
  params: { org: string; branch_id: string; semester_id: string };
}) {
  console.log(props.params);
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
              <Switchers />
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
