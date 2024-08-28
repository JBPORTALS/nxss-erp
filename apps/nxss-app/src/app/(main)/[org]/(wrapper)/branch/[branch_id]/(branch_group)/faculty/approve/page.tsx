import Link from "next/link";
import { ArrowRight } from "lucide-react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@nxss/ui/breadcrumb";

import { DataTable } from "~/app/_components/data-tabel";
import { FacultyApproveColumns } from "~/app/_components/faculty-approve-columns";
import { api } from "~/trpc/server";

export default async function Page({
  params,
}: {
  children: React.ReactNode;
  params: {
    org: string;
    branch_id: string;
    sem_id: string;
  };
}) {
  const { members } = await api.organization.getMembershipList({
    slug: params.org,
    unApproved: true,
  });

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
      <div>
        <DataTable columns={FacultyApproveColumns} data={members} />
      </div>
    </div>
  );
}
