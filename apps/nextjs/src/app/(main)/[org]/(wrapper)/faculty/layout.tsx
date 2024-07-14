"use client";

import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

import { Button } from "@nxss/ui/button";
import { TabItem, Tabs } from "@nxss/ui/tabs";

import { InviteDialog } from "~/app/_components/invite-dialog";

export default function Template(props: { children: React.ReactNode }) {
  const { org } = useParams();
  const pathname = usePathname();
  return (
    <div className="flex w-full flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-2">
          <h1 className="text-xl font-bold">Faculty</h1>
          <p className="text-sm text-muted-foreground">
            All staff members with access to <b>RJS</b> institution.
          </p>
        </div>
        <InviteDialog>
          <Button>Invite Member</Button>
        </InviteDialog>
      </div>
      <Tabs>
        <Link href={`/${org}/faculty`}>
          <TabItem isActive={pathname === `/${org}/faculty`}>Members</TabItem>
        </Link>

        <TabItem>Inactive</TabItem>
        <TabItem>Approve</TabItem>
        <Link href={`/${org}/faculty/invitations`}>
          <TabItem isActive={pathname === `/${org}/faculty/invitations`}>
            Invitations
          </TabItem>
        </Link>
      </Tabs>
      <section className="w-full">{props.children}</section>
    </div>
  );
}
