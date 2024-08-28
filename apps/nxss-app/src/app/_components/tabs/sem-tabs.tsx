"use client";

import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

import { TabItem, Tabs } from "@nxss/ui/tabs";

export default function SemTabsClient() {
  const { org, branch_id, sem_id } = useParams();
  const pathname = usePathname();
  return (
    <Tabs>
      <Link href={`/${org}/branch/${branch_id}/${sem_id}`}>
        <TabItem
          isActive={pathname === `/${org}/branch/${branch_id}/${sem_id}`}
        >
          Overview
        </TabItem>
      </Link>
      <Link href={`/${org}/branch/${branch_id}/${sem_id}/subjects`}>
        <TabItem
          isActive={
            pathname === `/${org}/branch/${branch_id}/${sem_id}/subjects`
          }
        >
          Subjects
        </TabItem>
      </Link>
      <Link href={`/${org}/branch/${branch_id}/${sem_id}/sessions`}>
        <TabItem
          isActive={
            pathname === `/${org}/branch/${branch_id}/${sem_id}/sessions`
          }
        >
          Sessions
        </TabItem>
      </Link>
      <Link href={`/${org}/branch/${branch_id}/${sem_id}/time-table`}>
        <TabItem
          isActive={
            pathname === `/${org}/branch/${branch_id}/${sem_id}/time-table`
          }
        >
          Timetable
        </TabItem>
      </Link>
      <Link href={`/${org}/branch/${branch_id}/${sem_id}/settings`}>
        <TabItem
          isActive={
            pathname === `/${org}/branch/${branch_id}/${sem_id}/settings`
          }
        >
          Settings
        </TabItem>
      </Link>
    </Tabs>
  );
}
