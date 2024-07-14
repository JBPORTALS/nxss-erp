import { notFound } from "next/navigation";
import { UserButton } from "@clerk/nextjs";
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
import { ThemeToggle } from "@nxss/ui/theme";

import AsideBarClient from "~/app/_components/asidebar-client";

export default async function Template(props: {
  children: React.ReactNode;
  params: { org: string };
}) {
  const { userId } = auth();

  // Fetch user's organizations
  if (userId) {
    const userOrgs = await clerkClient.users.getOrganizationMembershipList({
      userId,
    });

    // Check if the user is a member of the organization in the URL
    const isMember = userOrgs.data.some(
      (org) => org.organization.slug === props.params.org,
    );

    if (!isMember) {
      // If not a member, return 404
      return notFound();
    }
  }

  const organization = await clerkClient().organizations.getOrganization({
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
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold">{organization.name}</span>
              <SlashIcon className="size-4 text-muted-foreground/40" />
              <Select value="2024">
                <SelectTrigger
                  className={cn(
                    "w-fit border-none px-2 font-semibold shadow-none outline-none hover:bg-accent",
                  )}
                >
                  <SelectValue placeholder="Select Academic Year" />
                </SelectTrigger>
                <SelectContent className="p-2 text-base">
                  <SelectItem value="2024">Academic Year 2024</SelectItem>
                  <SelectItem value="2023">Academic Year 2023</SelectItem>
                  <SelectItem value="2022">Academic Year 2022</SelectItem>
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
