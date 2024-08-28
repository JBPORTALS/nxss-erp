"use client";

import React from "react";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

import { TabItem, Tabs } from "@nxss/ui/tabs";

export default function FacultyTabsClient() {
  const { org } = useParams();
  const pathname = usePathname();
  return (
    <Tabs>
      <Link href={`/${org}/faculty`}>
        <TabItem isActive={pathname === `/${org}/faculty`}>Members</TabItem>
      </Link>

      <TabItem>Inactive</TabItem>
      <Link href={`/${org}/faculty/approve`}>
        <TabItem isActive={pathname === `/${org}/faculty/approve`}>
          Approve
        </TabItem>
      </Link>
      <Link href={`/${org}/faculty/invitations`}>
        <TabItem isActive={pathname === `/${org}/faculty/invitations`}>
          Invitations
        </TabItem>
      </Link>
    </Tabs>
  );
}
