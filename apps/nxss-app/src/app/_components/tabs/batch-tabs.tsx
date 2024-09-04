"use client";

import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

import { Tabs, TabsList, TabsTrigger } from "@nxss/ui/tabs";

export default function BatchTabsClient() {
  const { org, branch_id, sem_id, section_id, batch_id } = useParams();
  const pathname = usePathname();
  return (
    <Tabs>
      <TabsList>
        <TabsTrigger
          isActive={
            pathname ===
            `/${org}/branch/${branch_id}/${sem_id}/${section_id}/${batch_id}`
          }
          value={`/${org}/branch/${branch_id}/${sem_id}/${section_id}/${batch_id}`}
        >
          <Link
            href={`/${org}/branch/${branch_id}/${sem_id}/${section_id}/${batch_id}`}
          >
            Student List
          </Link>
        </TabsTrigger>

        <TabsTrigger
          isActive={
            pathname ===
            `/${org}/branch/${branch_id}/${sem_id}/${section_id}/${batch_id}/time-table`
          }
          value={`/${org}/branch/${branch_id}/${sem_id}/${section_id}/${batch_id}/time-table`}
        >
          <Link
            href={`/${org}/branch/${branch_id}/${sem_id}/${section_id}/${batch_id}/time-table`}
          >
            Time Table
          </Link>
        </TabsTrigger>

        <TabsTrigger
          isActive={
            pathname ===
            `/${org}/branch/${branch_id}/${sem_id}/${section_id}/${batch_id}/settings`
          }
          value={`/${org}/branch/${branch_id}/${sem_id}/${section_id}/${batch_id}/settings`}
        >
          <Link
            href={`/${org}/branch/${branch_id}/${sem_id}/${section_id}/${batch_id}/settings`}
          >
            Settings
          </Link>
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
