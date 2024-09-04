"use client";

import React from "react";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@nxss/ui/tabs";

export default function FacultyTabsClient() {
  const { org } = useParams();
  const pathname = usePathname();

  // Define the tab values
  const tabValues = {
    active: `/${org}/faculty`,
    inactive: `/${org}/faculty/inactive`,
    invitations: `/${org}/faculty/invitations`,
  };

  return (
    <Tabs defaultValue={pathname} className="w-[510px]">
      <TabsList className="w-full">
        <TabsTrigger
          value={tabValues.active}
          isActive={pathname === tabValues.active}
        >
          <Link href={tabValues.active}>Active</Link>
        </TabsTrigger>

        <TabsTrigger
          value={tabValues.inactive}
          isActive={pathname === tabValues.inactive}
        >
          <Link href={tabValues.inactive}>In Active</Link>
        </TabsTrigger>

        <TabsTrigger
          value={tabValues.invitations}
          isActive={pathname === tabValues.invitations}
        >
          <Link href={tabValues.invitations}>Invitations</Link>
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
