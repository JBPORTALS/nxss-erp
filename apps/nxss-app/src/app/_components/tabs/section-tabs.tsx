"use client";

import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

import { Tabs, TabsList, TabsTrigger } from "@nxss/ui/tabs";

export default function SectionTabsClient() {
  const { org, branch_id, sem_id, section_id } = useParams();
  const pathname = usePathname();
  return (
    <Tabs>
      <TabsList>
        <Link href={`/${org}/branch/${branch_id}/${sem_id}/${section_id}`}>
          <TabsTrigger
            value="Student"
            isActive={
              pathname === `/${org}/branch/${branch_id}/${sem_id}/${section_id}`
            }
          >
            Student List
          </TabsTrigger>
        </Link>

        <Link href={`/${org}/branch/${branch_id}/${sem_id}/${section_id}/fees`}>
          <TabsTrigger
            value="Fee Details"
            isActive={
              pathname ===
              `/${org}/branch/${branch_id}/${sem_id}/${section_id}/fees`
            }
          >
            Fee Details
          </TabsTrigger>
        </Link>
        <Link
          href={`/${org}/branch/${branch_id}/${sem_id}/${section_id}/settings`}
        >
          <TabsTrigger
            value="settings"
            isActive={
              pathname ===
              `/${org}/branch/${branch_id}/${sem_id}/${section_id}/settings`
            }
          >
            Settings
          </TabsTrigger>
        </Link>
      </TabsList>
    </Tabs>
  );
}
