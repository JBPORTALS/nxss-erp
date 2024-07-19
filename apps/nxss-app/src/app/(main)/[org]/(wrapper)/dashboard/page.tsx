"use client";

import { Protect, useUser } from "@clerk/nextjs";

import StaffOnboarding from "~/app/_components/staff-onboaring";

export default function Page() {
  const { user } = useUser();
  return (
    <div>
      <h1 className="text-lg">
        Hey, <b>{user?.emailAddresses[0]?.emailAddress}</b>
      </h1>
      <Protect role="org:staff">
        <StaffOnboarding />
      </Protect>
    </div>
  );
}
