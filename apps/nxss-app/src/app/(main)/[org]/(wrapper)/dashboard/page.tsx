import { Protect } from "@clerk/nextjs";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { ScanEyeIcon } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@nxss/ui/card";
import { Progress } from "@nxss/ui/progress";
import { VStack } from "@nxss/ui/stack";

import StaffOnboarding from "~/app/_components/staff-onboaring";
import { api } from "~/trpc/server";

export default async function Page() {
  const { orgId, userId, sessionClaims } = auth();

  if (!userId) throw new Error("No user logged in");

  const { firstName, lastName } = await clerkClient().users.getUser(userId);

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
        ) : (
          <div className="w-full space-y-3">
            <div>
              <h1 className="text-xl font-semibold">
                Good Afternoon, {firstName} {lastName}
              </h1>
              <span className="text-muted-foreground">
                Access to{" "}
                <span className="text-foreground">
                  {sessionClaims.metadata.org_name}
                </span>{" "}
                institution's staff dashboard.
              </span>
            </div>

            <div className="flex h-screen flex-col items-center justify-center gap-2 rounded-md border">
              <h2 className="text-2xl font-semibold">
                Nothing to display at the moment
              </h2>
              <span className="text-muted-foreground">
                Wait for allocation of subject by your{" "}
                <span className="text-foreground">
                  {sessionClaims.metadata.org_name}
                </span>{" "}
                institution admin.
              </span>
            </div>
          </div>
        )}
      </Protect>
      <Protect role="org:admin">
        <div className="w-full space-y-4">
          <VStack className="gap-2">
            <h1 className="text-xl font-semibold">
              Good Afternoon, {firstName} {lastName}
            </h1>
            <span className="text-muted-foreground">
              Access to{" "}
              <span className="text-foreground">
                {sessionClaims.metadata.org_name}
              </span>{" "}
              institution's admin dashboard.
            </span>
          </VStack>

          <div className="grid w-full gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4">
            <Card x-chunk="dashboard-05-chunk-2">
              <CardHeader>
                <CardTitle className="text-base font-normal">
                  Total Staff’s
                </CardTitle>
                <CardDescription>Active Staff Members</CardDescription>
              </CardHeader>
              <CardContent className="text-xl font-semibold">50</CardContent>
            </Card>

            <Card x-chunk="dashboard-05-chunk-2">
              <CardHeader>
                <CardTitle className="text-base font-normal">
                  Total Student’s
                </CardTitle>
                <CardDescription>Total Active Students</CardDescription>
              </CardHeader>
              <CardContent className="text-xl font-semibold">15000</CardContent>
            </Card>

            <Card x-chunk="dashboard-05-chunk-2">
              <CardHeader>
                <CardTitle className="text-base font-normal">
                  Total Branches
                </CardTitle>
                <CardDescription>Branches in Operation</CardDescription>
              </CardHeader>
              <CardContent className="text-xl font-semibold">06</CardContent>
            </Card>

            <Card x-chunk="dashboard-05-chunk-2">
              <CardHeader>
                <CardTitle className="text-base font-normal">
                  Total Subjects
                </CardTitle>
                <CardDescription>Subjects in Current Catalog</CardDescription>
              </CardHeader>
              <CardContent className="text-xl font-semibold">50</CardContent>
            </Card>
          </div>
        </div>
      </Protect>
    </div>
  );
}
