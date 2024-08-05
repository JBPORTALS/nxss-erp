"use client";

import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

import { Button } from "@nxss/ui/button";
import { TabItem, Tabs } from "@nxss/ui/tabs";

export default function Template(props: { children: React.ReactNode }) {
  const { org, branch_id, sem_id } = useParams();
  const pathname = usePathname();
  return (
    <div className="flex w-full flex-col gap-8">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold">Aerospace Engg</h1>
          <p className="text-sm text-muted-foreground">
            Engineering the Future of Aviation and Space Exploration.
          </p>
        </div>
        {/* Invite Student */}
        <Button>Invite Student</Button>
      </div>
      <Tabs>
        <Link href={`/${org}/branch/${branch_id}/${sem_id}`}>
          <TabItem
            isActive={pathname === `/${org}/branch/${branch_id}/${sem_id}`}
          >
            Overview
          </TabItem>
        </Link>
        <Link href={`/${org}/branch/${branch_id}/${sem_id}`}>
          <TabItem
            isActive={pathname === `/${org}/branch/${branch_id}/${sem_id}`}
          >
            Students
          </TabItem>
        </Link>
        <Link href={`/${org}/branch/${branch_id}/${sem_id}`}>
          <TabItem
            isActive={pathname === `/${org}/branch/${branch_id}/${sem_id}`}
          >
            Inactive
          </TabItem>
        </Link>
        <Link href={`/${org}/branch/${branch_id}/${sem_id}`}>
          <TabItem
            isActive={pathname === `/${org}/branch/${branch_id}/${sem_id}`}
          >
            Invitations
          </TabItem>
        </Link>
        <Link href={`/${org}/branch/${branch_id}/${sem_id}`}>
          <TabItem
            isActive={pathname === `/${org}/branch/${branch_id}/${sem_id}`}
          >
            Settings
          </TabItem>
        </Link>
      </Tabs>
      <section className="w-full">{props.children}</section>
    </div>
  );
}