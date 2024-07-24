import Image from "next/image";
import { Protect } from "@clerk/nextjs";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { ScanEyeIcon } from "lucide-react";

import StaffOnboarding from "~/app/_components/staff-onboaring";
import { api } from "~/trpc/server";

export default async function Page() {
  const { orgId } = auth();

  if (!orgId) throw new Error("No organization selected");

  const { name: orgName } = await clerkClient().organizations.getOrganization({
    organizationId: orgId,
  });
  const { status } = await api.organization.getStaffProfileStatus();

  return (
    <div className="h-full w-full">
      <Protect role="org:staff">
        {!status ? (
          <StaffOnboarding />
        ) : status === "in_review" ? (
          <div className="flex h-full w-full flex-col items-center gap-8 pt-28">
            <ScanEyeIcon className="size-28 animate-pulse text-orange-700" />
            <div className="space-y-2 text-center">
              <h1 className="text-2xl font-bold">
                Your profile is under review
              </h1>
              <p className="text-muted-foreground">
                Just wait for verification to be completed by your{" "}
                <b>{orgName}</b> institution admin.
              </p>
            </div>
          </div>
        ) : null}
      </Protect>
    </div>
  );
}
