"use client";

import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

import { TabItem, Tabs } from "@nxss/ui/tabs";

export default function SectionTabsClient() {
  const { org, branch_id, sem_id, section_id } = useParams();
  const pathname = usePathname();
  return (
    <Tabs>
      <Link href={`/${org}/branch/${branch_id}/${sem_id}/${section_id}`}>
        <TabItem
          isActive={
            pathname === `/${org}/branch/${branch_id}/${sem_id}/${section_id}`
          }
        >
          Student List
        </TabItem>
      </Link>

      <Link href={`/${org}/branch/${branch_id}/${sem_id}/${section_id}/fees`}>
        <TabItem
          isActive={
            pathname ===
            `/${org}/branch/${branch_id}/${sem_id}/${section_id}/fees`
          }
        >
          Fee Details
        </TabItem>
      </Link>
      <Link
        href={`/${org}/branch/${branch_id}/${sem_id}/${section_id}/settings`}
      >
        <TabItem
          isActive={
            pathname ===
            `/${org}/branch/${branch_id}/${sem_id}/${section_id}/settings`
          }
        >
          Settings
        </TabItem>
      </Link>
    </Tabs>
  );
}
