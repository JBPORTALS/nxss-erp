import Link from "next/link";
import { ArrowRight } from "lucide-react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@nxss/ui/breadcrumb";
import { VStack } from "@nxss/ui/stack";

import { api } from "~/trpc/server";

export default async function Template({
  params,
  children,
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
    <div className="flex flex-col gap-2">
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
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link
                href={`/${params.org}/branch/${params.branch_id}/${params.sem_id}`}
              >
                Semester {params.sem_id}
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbSeparator>
            <ArrowRight />
          </BreadcrumbSeparator>
          <BreadcrumbItem className="text-foreground">FOC</BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <section className="w-full">{children}</section>
    </div>
  );
}
