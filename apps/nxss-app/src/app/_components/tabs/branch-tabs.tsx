"use client";

import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

import { Tabs, TabsList, TabsTrigger } from "@nxss/ui/tabs";

export default function BranchTabsClient() {
  const { org, branch_id } = useParams();
  const pathname = usePathname();
  return (
    <Tabs>
      <TabsList>
        <TabsTrigger
          isActive={pathname === `/${org}/branch/${branch_id}/students`}
          value={`/${org}/branch/${branch_id}/students`}
        >
          <Link href={`/${org}/branch/${branch_id}/students`}>
            Student List
          </Link>
        </TabsTrigger>
        <TabsTrigger
          isActive={
            pathname === `/${org}/branch/${branch_id}/students/inactive`
          }
          value={`/${org}/branch/${branch_id}/inactive`}
        >
          <Link href={`/${org}/branch/${branch_id}/students/inactive`}>
            Inactive
          </Link>
        </TabsTrigger>
        <TabsTrigger
          isActive={
            pathname === `/${org}/branch/${branch_id}/students/invitations`
          }
          value={`/${org}/branch/${branch_id}/invitations`}
        >
          <Link href={`/${org}/branch/${branch_id}/students/invitations`}>
            Invitations
          </Link>
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
