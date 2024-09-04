import React from "react";
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
import { HStack, VStack } from "@nxss/ui/stack";

import { api } from "~/trpc/server";

export default async function Settings({
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
    <VStack className="w-full gap-8">
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
            <BreadcrumbItem className="text-foreground">
              Settings
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-sm text-muted-foreground">
          Facilities and Tools for Computer Science Engineering
        </p>
      </div>
      <VStack>
        <span className="text-lg font-semibold">Complete Semester</span>
        <p className="w-2/3 text-muted-foreground">
          Completing the semester will make the data within the{" "}
          <span className="text-foreground">
            {`${branch_details?.name} > semester ${params.sem_id}`}
          </span>{" "}
          non-editable. This action is irresavable.
        </p>
      </VStack>
      <Button size={"lg"}>Complete Semester</Button>
      <hr className="w-full"></hr>
      <VStack>
        <span className="text-lg font-semibold text-red-500">
          Clear data of semester
        </span>
        <p className="w-2/3 text-muted-foreground">
          Clearing all data of{" "}
          <span className="text-foreground">
            {`${branch_details?.name} > semester ${params.sem_id}`}
          </span>{" "}
          will permanently erase all data and this action is{" "}
          <span className="text-red-500">permanent and irreversible.</span>
        </p>
      </VStack>
      <Button size={"lg"} variant={"destructive_outline"}>
        Clear Data
      </Button>
    </VStack>
  );
}
