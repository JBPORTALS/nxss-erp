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
import FacultyTabsClient from "~/app/_components/tabs/faculty-tabs";
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
    <div className="flex w-full flex-col gap-8">
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
          <BreadcrumbItem className="text-foreground">Overview</BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="flex w-full flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-2">
            <h1 className="text-xl font-bold">Faculty</h1>
            <p className="text-sm text-muted-foreground">
              All staff members with access to <b>Computer Science</b> Branch
            </p>
          </div>
          <InviteDialog>
            <Button>Invite Member</Button>
          </InviteDialog>
        </div>
        <FacultyTabsClient />
        <section className="w-full">{children}</section>
      </div>
    </div>
  );
}
