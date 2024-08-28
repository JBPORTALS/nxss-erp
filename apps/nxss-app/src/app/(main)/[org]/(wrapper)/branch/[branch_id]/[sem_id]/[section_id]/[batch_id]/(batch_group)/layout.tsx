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

import BatchTabsClient from "~/app/_components/tabs/batch-tabs";
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
    section_id: string;
    batch_id: string;
  };
}) {
  const branch_details = await api.branch.getDetails({ id: params.branch_id });

  return (
    <div className="flex flex-col gap-8">
      <VStack>
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
                <Link href={`/${params.org}/branch/${params.branch_id}/1`}>
                Semester 1
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <ArrowRight />
            </BreadcrumbSeparator>
          <BreadcrumbList className="text-accent-foreground/80">
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link
                  href={`/${params.org}/branch/${params.branch_id}/${params.sem_id}/${params.section_id}`}
                >
                  Section A
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <ArrowRight />
            </BreadcrumbSeparator>
            <BreadcrumbItem className="text-foreground">
              Batch {params.batch_id}
            </BreadcrumbItem>
          </BreadcrumbList>
          </BreadcrumbList>
        </Breadcrumb>
        <h1 className="text-2xl font-bold">Batch {params.batch_id}
        </h1>
        <p className="text-sm text-muted-foreground">
          Class Details and Enrollment Information
        </p>
        
      </VStack>
      <BatchTabsClient />
      <section className="w-full">{children}</section>
    </div>
  );
}
