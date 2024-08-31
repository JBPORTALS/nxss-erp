"use client";

import React from "react";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

import { TabItem, Tabs } from "@nxss/ui/tabs";

export default function BranchFacultyTabsClient() {
  const { org, branch_id } = useParams();
  const pathname = usePathname();
  return (
    <Tabs>
      <Link href={`/${org}/branch/${branch_id}/faculty`}>
        <TabItem isActive={pathname === `/${org}/branch/${branch_id}/faculty`}>
          Members
        </TabItem>
      </Link>

      <TabItem>Inactive</TabItem>
      <Link href={`/${org}/branch/${branch_id}/faculty/approve`}>
        <TabItem
          isActive={pathname === `/${org}/branch/${branch_id}/faculty/approve`}
        >
          Approve
        </TabItem>
      </Link>
      <Link href={`/${org}/branch/${branch_id}/faculty/invitations`}>
        <TabItem
          isActive={
            pathname === `/${org}/branch/${branch_id}/faculty/invitations`
          }
        >
          Invitations
        </TabItem>
      </Link>
    </Tabs>
  );
}
