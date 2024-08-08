"use client";

import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { ArrowRight } from "lucide-react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@nxss/ui/breadcrumb";
import { TabItem, Tabs } from "@nxss/ui/tabs";

export default function Template(props: { children: React.ReactNode }) {
  const { org, branch_id, sem_id } = useParams();
  const pathname = usePathname();
  return (
    <div className="flex w-full flex-col gap-8">
      <div className="flex flex-col gap-2">
        <Breadcrumb>
          <BreadcrumbList className="text-accent-foreground/80">
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href={`/${org}/branch/${branch_id}`}>
                  Computer Science
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <ArrowRight />
            </BreadcrumbSeparator>
            <BreadcrumbItem className="text-foreground">
              Semester 1
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <h1 className="text-2xl font-bold">Semester 1</h1>
      </div>

      <Tabs>
        <Link href={`/${org}/branch/${branch_id}/${sem_id}`}>
          <TabItem
            isActive={pathname === `/${org}/branch/${branch_id}/${sem_id}`}
          >
            Overview
          </TabItem>
        </Link>
        <Link href={`/${org}/branch/${branch_id}/${sem_id}/subjects`}>
          <TabItem
            isActive={
              pathname === `/${org}/branch/${branch_id}/${sem_id}/subjects`
            }
          >
            Subjects
          </TabItem>
        </Link>
        <Link href={`/${org}/branch/${branch_id}/${sem_id}/sessions`}>
          <TabItem
            isActive={
              pathname === `/${org}/branch/${branch_id}/${sem_id}/sessions`
            }
          >
            Sessions
          </TabItem>
        </Link>
        <Link href={`/${org}/branch/${branch_id}/${sem_id}/time-table`}>
          <TabItem
            isActive={
              pathname === `/${org}/branch/${branch_id}/${sem_id}/time-table`
            }
          >
            Timetable
          </TabItem>
        </Link>
        <Link href={`/${org}/branch/${branch_id}/${sem_id}/settings`}>
          <TabItem
            isActive={
              pathname === `/${org}/branch/${branch_id}/${sem_id}/settings`
            }
          >
            Settings
          </TabItem>
        </Link>
      </Tabs>
      <section className="w-full">{props.children}</section>
    </div>
  );
}
