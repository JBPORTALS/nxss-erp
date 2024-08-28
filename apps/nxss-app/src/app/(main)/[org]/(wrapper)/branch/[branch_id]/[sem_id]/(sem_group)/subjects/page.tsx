"use client";

import React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Ellipsis } from "lucide-react";

import { AvatarList } from "@nxss/ui/avatar-list";
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

export default function Subjects() {
  const { org, branch_id, sem_id } = useParams();
  return (
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
              href={`/${org}/branch/${branch_id}/${sem_id}/subject/${subject.id}`}
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
  );
}
