import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@nxss/ui/breadcrumb";
import { Button } from "@nxss/ui/button";

import BranchTabsClient from "~/app/_components/tabs/branch-tabs";
import { api } from "~/trpc/server";

export default async function Template(props: any) {
  return (
    <div className="flex flex-col gap-2">
      <Breadcrumb>
        <BreadcrumbList className="text-accent-foreground/80">
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href={`#`}>Computer Science</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          
          <BreadcrumbSeparator>
            <ArrowRight />
          </BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href={`#`}>Semester 1</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          
          <BreadcrumbSeparator>
            <ArrowRight />
          </BreadcrumbSeparator>
          <BreadcrumbItem className="text-foreground">
            FOC
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <section className="w-full">{props.children}</section>
    </div>
  );
}
