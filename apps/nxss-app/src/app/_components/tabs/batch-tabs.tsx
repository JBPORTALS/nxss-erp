"use client";

import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

import { TabItem, Tabs } from "@nxss/ui/tabs";

export default function BatchTabsClient() {
  const { org, branch_id, sem_id, section_id, batch_id } = useParams();
  const pathname = usePathname();
  return (
    <Tabs>
      <Link
        href={`/${org}/branch/${branch_id}/${sem_id}/${section_id}/${batch_id}`}
      >
        <TabItem
          isActive={
            pathname ===
            `/${org}/branch/${branch_id}/${sem_id}/${section_id}/${batch_id}`
          }
        >
          Students
        </TabItem>
      </Link>
      <Link
        href={`/${org}/branch/${branch_id}/${sem_id}/${section_id}/${batch_id}/inactive`}
      >
        <TabItem
          isActive={
            pathname ===
            `/${org}/branch/${branch_id}/${sem_id}/${section_id}/${batch_id}/inactive`
          }
        >
          Inactive
        </TabItem>
      </Link>
      <Link
        href={`/${org}/branch/${branch_id}/${sem_id}/${section_id}/${batch_id}/time-table`}
      >
        <TabItem
          isActive={
            pathname ===
            `/${org}/branch/${branch_id}/${sem_id}/${section_id}/${batch_id}/time-table`
          }
        >
          Timetable
        </TabItem>
      </Link>
      <Link
        href={`/${org}/branch/${branch_id}/${sem_id}/${section_id}/${batch_id}/fees`}
      >
        <TabItem
          isActive={
            pathname ===
            `/${org}/branch/${branch_id}/${sem_id}/${section_id}/${batch_id}/fees`
          }
        >
          Fees
        </TabItem>
      </Link>
      <Link
        href={`/${org}/branch/${branch_id}/${sem_id}/${section_id}/${batch_id}/settings`}
      >
        <TabItem
          isActive={
            pathname ===
            `/${org}/branch/${branch_id}/${sem_id}/${section_id}/${batch_id}/settings`
          }
        >
          Settings
        </TabItem>
      </Link>
    </Tabs>
  );
}