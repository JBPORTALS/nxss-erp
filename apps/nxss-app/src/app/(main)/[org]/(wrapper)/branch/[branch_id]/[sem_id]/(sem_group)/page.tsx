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
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@nxss/ui/card";
import { Progress } from "@nxss/ui/progress";
import { HStack } from "@nxss/ui/stack";

import { api } from "~/trpc/server";

export default async function Page({
  params,
}: {
  params: {
    org: string;
    branch_id: string;
    sem_id: string;
  };
}) {
  const branch_details = await api.branch.getDetails({ id: params.branch_id });
  return (
    <div>
      <div className="flex flex-col gap-2 pb-8">
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
              Overview
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <h1 className="text-2xl font-bold">Overview</h1>
        <p className="text-sm text-muted-foreground">
          An journey throughout space with engineering
        </p>
      </div>
      <div className="grid w-full grid-cols-4 gap-5">
        <Card x-chunk="dashboard-05-chunk-2 " className="w-full">
          <CardHeader className="pb-2">
            <CardDescription>Attendance</CardDescription>
            <CardTitle className="text-4xl">68%</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground">
              Overall semester attendance.
            </div>
          </CardContent>
          <CardFooter>
            <Progress value={68} />
          </CardFooter>
        </Card>
        <Card x-chunk="dashboard-05-chunk-2 " className="w-full">
          <CardHeader className="pb-2">
            <CardDescription>Total no. of Staff</CardDescription>
            <CardTitle className="text-4xl">50</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground">
              Active staff members
            </div>
          </CardContent>
        </Card>
        <Card x-chunk="dashboard-05-chunk-2 " className="w-full">
          <CardHeader className="pb-2">
            <CardDescription>Total no. of Students</CardDescription>
            <CardTitle className="text-4xl">15000</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground">
              Total active Students
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
