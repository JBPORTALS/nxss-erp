import Link from "next/link";
import { ArrowRight } from "lucide-react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@nxss/ui/breadcrumb";
import { Button } from "@nxss/ui/button";

import { InviteDialog } from "~/app/_components/dailog/invite-dialog";
import BranchTabsClient from "~/app/_components/tabs/branch-tabs";
import { api } from "~/trpc/server";

export default async function Template({
  children,
  params,
}: {
  children: React.ReactNode;
  params: {
    org: string;
    branch_id: string;
    sem_id: string;
  };
}) {
  const branch_details = await api.branch.getDetails({ id: params.branch_id });

  return (
    <div className="flex w-full flex-col gap-2">
      <Breadcrumb>
        <BreadcrumbList className="text-accent-foreground/80">
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href={`/${params.org}/branch/${params.branch_id}`}>
                {branch_details?.name}
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>
            <ArrowRight />
          </BreadcrumbSeparator>
          <BreadcrumbItem className="text-foreground">Students</BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="flex w-full flex-col gap-8">
        <div className="flex w-full">
          <div className="flex w-full flex-col justify-between gap-2">
            <h1 className="text-xl font-bold">Students</h1>
            <p className="text-sm text-muted-foreground">
              Students are provided access to the computer science engineering
              resources.
            </p>
          </div>
          <InviteDialog>
            <Button>Invite Member</Button>
          </InviteDialog>
        </div>
        <BranchTabsClient />
        <main className="w-full">{children}</main>
      </div>
    </div>
  );
}
