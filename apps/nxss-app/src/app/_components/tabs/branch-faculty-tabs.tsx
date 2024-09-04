"use client";

import React from "react";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

import { Tabs, TabsList, TabsTrigger } from "@nxss/ui/tabs";

export default function BranchFacultyTabsClient() {
  const { org, branch_id } = useParams();
  const pathname = usePathname();
  return (
    <Tabs>
      <TabsList>
        <TabsTrigger
          isActive={pathname === `/${org}/branch/${branch_id}/faculty`}
          value={`/${org}/branch/${branch_id}/faculty`}
        >
          <Link href={`/${org}/branch/${branch_id}/faculty`}>Members</Link>
        </TabsTrigger>
        <TabsTrigger
          isActive={pathname === `/${org}/branch/${branch_id}/faculty/approve`}
          value={`/${org}/branch/${branch_id}/faculty/approve`}
        >
          <Link href={`/${org}/branch/${branch_id}/faculty/approve`}>
            Approve
          </Link>
        </TabsTrigger>
        <TabsTrigger
          isActive={
            pathname === `/${org}/branch/${branch_id}/faculty/invitations`
          }
          value={`/${org}/branch/${branch_id}/faculty/invitations`}
        >
          <Link href={`/${org}/branch/${branch_id}/faculty/invitations`}>
            Invitations
          </Link>
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
