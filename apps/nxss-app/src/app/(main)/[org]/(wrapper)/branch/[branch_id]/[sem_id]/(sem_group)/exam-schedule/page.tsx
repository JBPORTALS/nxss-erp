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

import { ScheduleCards } from "~/app/_components/card/schudle-card-client";
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
  const initialCardsData = await fetchInitialCardsData();
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
              Exam Schedule
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <h1 className="text-2xl font-bold">Exam Schedule</h1>
        <p className="text-sm text-muted-foreground">
          Detailed Examination Schedule for All Subjects
        </p>
      </div>
      <ScheduleCards initialCardsData={initialCardsData} />
    </div>
  );
}

async function fetchInitialCardsData() {
  // Fetch your data here
  return [
    {
      id: 1,
      title: "IT Skills",
      code: "20CS21T",
      date: "Tuesday, 16th August",
      time: "9:00 AM - 12:00 PM",
      sections: "All",
      batch: "1",
      uploadedDate: "Jan 20, 2024",
      avatarSrc: "https://github.com/shadcn.png",
      avatarFallback: "CN",
      colorCode: 1,
    },
    {
      id: 2,
      title: "Mathematics",
      code: "20MA31T",
      date: "Wednesday, 17th August",
      time: "10:00 AM - 11:30 AM",
      sections: "A",
      batch: "2",
      uploadedDate: "Jan 21, 2024",
      avatarSrc: "https://github.com/vercel.png",
      avatarFallback: "VC",
      colorCode: 2,
    },
    {
      id: 3,
      title: "Physics",
      code: "20PH41T",
      date: "Thursday, 18th August",
      time: "11:00 AM - 1:00 PM",
      sections: "B",
      batch: "3",
      uploadedDate: "Jan 22, 2024",
      avatarSrc: "https://github.com/facebook.png",
      avatarFallback: "FB",
      colorCode: 3,
    },

    // Add more data here
  ];
}
