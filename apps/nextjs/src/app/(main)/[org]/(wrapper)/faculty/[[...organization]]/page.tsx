"use client";

import { OrganizationProfile, useAuth, useUser } from "@clerk/nextjs";

import { TabItem, Tabs } from "@nxss/ui/tabs";

export default function Page() {
  const { signOut } = useAuth();
  const { user } = useUser();
  return (
    <div className="flex w-full flex-col gap-4">
      <div className="flex flex-col gap-2">
        <h1 className="text-xl font-bold">Faculty</h1>
        <p className="text-sm text-muted-foreground">
          All staff members with access to KSIT institution.
        </p>
      </div>
      <Tabs>
        <TabItem isActive>Faculty</TabItem>
        <TabItem>Invitations</TabItem>
      </Tabs>
    </div>
  );
}
