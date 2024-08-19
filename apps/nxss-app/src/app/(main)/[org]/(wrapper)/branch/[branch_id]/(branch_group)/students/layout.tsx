import { notFound } from "next/navigation";
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

import AsideBarClient from "~/app/_components/asidebar-client";
import ProfilePopover from "~/app/_components/popovers/profile-popover";
import BranchTabsClient from "~/app/_components/tabs/branch-tabs";

export default async function Template(props: any) {
  return (
    <div className="w-full">
      <BranchTabsClient />
      <main className="w-full px-10 py-8">{props.children}</main>
    </div>
  );
}
