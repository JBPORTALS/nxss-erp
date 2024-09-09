"use client";

import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

import { Tabs, TabsList, TabsTrigger } from "@nxss/ui/tabs";

export default function SemTabsClient() {
  const { org, branch_id, sem_id } = useParams();
  const pathname = usePathname();
  return (
    <Tabs>
      <TabsList>
        <Link href={`/${org}/branch/${branch_id}/${sem_id}`}>
          <TabsTrigger
            value=""
            isActive={pathname === `/${org}/branch/${branch_id}/${sem_id}`}
          >
            Overview
          </TabsTrigger>
        </Link>
        <Link href={`/${org}/branch/${branch_id}/${sem_id}/subjects`}>
          <TabsTrigger
            value="subjects"
            isActive={
              pathname === `/${org}/branch/${branch_id}/${sem_id}/subjects`
            }
          >
            Subjects
          </TabsTrigger>
        </Link>
        <Link href={`/${org}/branch/${branch_id}/${sem_id}/sessions`}>
          <TabsTrigger
            value="sessions"
            isActive={
              pathname === `/${org}/branch/${branch_id}/${sem_id}/sessions`
            }
          >
            Sessions
          </TabsTrigger>
        </Link>
        <Link href={`/${org}/branch/${branch_id}/${sem_id}/time-table`}>
          <TabsTrigger
            value="time-table"
            isActive={
              pathname === `/${org}/branch/${branch_id}/${sem_id}/time-table`
            }
          >
            Timetable
          </TabsTrigger>
        </Link>
        <Link href={`/${org}/branch/${branch_id}/${sem_id}/settings`}>
          <TabsTrigger
            value="settigns"
            isActive={
              pathname === `/${org}/branch/${branch_id}/${sem_id}/settings`
            }
          >
            Settings
          </TabsTrigger>
        </Link>
      </TabsList>
    </Tabs>
  );
}
