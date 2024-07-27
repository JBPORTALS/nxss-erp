import Image from "next/image";
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

import StaffOnboarding from "~/app/_components/staff-onboaring";
import { api } from "~/trpc/server";

export default async function Page() {
  const { orgId, userId, sessionClaims } = auth();
  const jwt = auth().sessionClaims;

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
              institution's admin dashboard.
            </span>
          </div>

          <div className="xl:grid-cols-4w-full grid gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4">
            <Card x-chunk="dashboard-05-chunk-2">
              <CardHeader className="pb-2">
                <CardDescription>Attendance</CardDescription>
                <CardTitle className="text-4xl">68%</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xs text-muted-foreground">
                  Overall academic year attendance.
                </div>
              </CardContent>
              <CardFooter>
                <Progress value={68} />
              </CardFooter>
            </Card>
            <Card x-chunk="dashboard-05-chunk-2">
              <CardHeader className="pb-2">
                <CardDescription>Total Staff</CardDescription>
                <CardTitle className="text-4xl">35</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xs text-muted-foreground">
                  active staff members.
                </div>
              </CardContent>
              <CardFooter></CardFooter>
            </Card>
            <Card x-chunk="dashboard-05-chunk-2">
              <CardHeader className="pb-2">
                <CardDescription>Total Students</CardDescription>
                <CardTitle className="text-4xl">9,837</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xs text-muted-foreground">
                  total active students.
                </div>
              </CardContent>
              <CardFooter></CardFooter>
            </Card>
          </div>
        </div>
      </Protect>
    </div>
  );
}
