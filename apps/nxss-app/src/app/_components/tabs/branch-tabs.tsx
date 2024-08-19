"use client";

import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

import { TabItem, Tabs } from "@nxss/ui/tabs";

export default function BranchTabsClient() {
  const { org, branch_id } = useParams();
  const pathname = usePathname();
  return (
    <Tabs>
      <Link href={`/${org}/branch/${branch_id}/students`}>
        <TabItem isActive={pathname === `/${org}/branch/${branch_id}/students`}>
          Students
        </TabItem>
      </Link>
      <Link href={`/${org}/branch/${branch_id}/students/inactive`}>
        <TabItem
          isActive={
            pathname === `/${org}/branch/${branch_id}/students/inactive`
          }
        >
          Inactive 
        </TabItem>
      </Link>
      <Link href={`/${org}/branch/${branch_id}/students/invitations`}>
        <TabItem
          isActive={
            pathname === `/${org}/branch/${branch_id}/students/invitations`
          }
        >
          Invitations
        </TabItem>
      </Link>
    </Tabs>
  );
}
