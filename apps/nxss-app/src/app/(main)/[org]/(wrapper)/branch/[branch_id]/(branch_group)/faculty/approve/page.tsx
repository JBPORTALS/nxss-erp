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
    <div>
      <DataTable columns={FacultyApproveColumns} data={members} />
    </div>
  );
}
