import React from "react";
import Link from "next/link";
import { ArrowRight, Ellipsis } from "lucide-react";

import { AvatarList } from "@nxss/ui/avatar-list";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@nxss/ui/breadcrumb";
import { Button } from "@nxss/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@nxss/ui/card";
import { ColorDot } from "@nxss/ui/color-dot";
import { Input } from "@nxss/ui/input";
import { HStack, VStack } from "@nxss/ui/stack";

import { api } from "~/trpc/server";

const subjects = [
  {
    id: 1,
    code: "20CS02T",
    title: "Fundamentals of computers",
    description:
      "Fundamentals of computers cover the core principles and essential components of digital technology and computing systems.",
    avatars: [
      "https://avatars2.githubusercontent.com/u/263385",
      "https://avatars2.githubusercontent.com/u/132554",
      "https://avatars2.githubusercontent.com/u/263385",
      "https://avatars2.githubusercontent.com/u/132554",
    ],
    color: 1,
  },
  {
    id: 2,
    code: "20CS52T",
    title: "Full stack development",
    description: "combination both Frontend and Backend development",
    avatars: [
      "https://avatars2.githubusercontent.com/u/263385",
      "https://avatars2.githubusercontent.com/u/132554",
      "https://avatars2.githubusercontent.com/u/263385",
      "https://avatars2.githubusercontent.com/u/132554",
    ],
    color: 2,
  },
  {
    id: 3,
    code: "20CS01T",
    title: "Engineering Mathematics",
    description:
      "Engineering Mathematics covers essential mathematical concepts and techniques crucial for solving complex engineering problems. Topics include linear algebra, calculus, differential equations, and numerical methods, providing a strong foundation for advanced engineering courses.",
    avatars: [
      "https://avatars2.githubusercontent.com/u/263385",
      "https://avatars2.githubusercontent.com/u/132554",
    ],
    color: 3,
  },
];

export default async function Subjects({
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
              Subjects
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <h1 className="text-2xl font-bold">Subjects</h1>
        <p className="text-sm text-muted-foreground">
          Subjects Overview and Descriptions
        </p>
      </div>
      <VStack className="h-full w-full gap-8">
        <HStack className="w-full items-center justify-between">
          <Input placeholder="Search..." className="w-2/3" />
          <Button>Add Subject</Button>
        </HStack>
        <div className="grid w-full grid-cols-3 gap-5">
          <>
            {subjects.map((subject) => (
              <Link
                key={subject.id}
                href={`/${params.org}/branch/${params.branch_id}/${params.sem_id}/subject/${subject.id}`}
              >
                <Card className="relative flex h-full w-full flex-col">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-4">
                      <ColorDot colorcode={subject.color} />
                      <VStack className="gap-0 overflow-hidden">
                        <h1 className="truncate text-lg">{subject.title}</h1>
                        <span className="truncate text-sm font-normal text-muted-foreground">
                          {subject.code}
                        </span>
                      </VStack>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow overflow-hidden">
                    <span className="line-clamp-3 text-sm text-muted-foreground">
                      {subject.description}
                    </span>
                  </CardContent>
                  <CardFooter className="flex w-full justify-between border-t py-4">
                    <AvatarList
                      images={subject.avatars}
                      maxAvatars={3}
                      size="small"
                    />
                    <Ellipsis className="text-muted-foreground" />
                  </CardFooter>
                </Card>
              </Link>
            ))}
          </>
        </div>
      </VStack>
    </div>
  );
}
