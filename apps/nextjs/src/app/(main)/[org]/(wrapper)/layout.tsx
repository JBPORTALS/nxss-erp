import { UserButton } from "@clerk/nextjs";
import { clerkClient } from "@clerk/nextjs/server";
import { DotIcon, RocketIcon } from "lucide-react";

import { cn } from "@nxss/ui";
import { Button } from "@nxss/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@nxss/ui/select";
import { ThemeToggle } from "@nxss/ui/theme";

import AsideBarClient from "~/app/_components/asidebar-client";

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
              <span className="px-2 font-semibold">{org.name}</span>
              <DotIcon className="size-4 text-muted-foreground/40" />
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
            <ThemeToggle />
            <UserButton />
          </div>
        </header>
      </div>
      <section className="flex flex-1">
        <AsideBarClient />
        <main className="w-full px-10 py-8">{props.children}</main>
      </section>
    </div>
  );
}
