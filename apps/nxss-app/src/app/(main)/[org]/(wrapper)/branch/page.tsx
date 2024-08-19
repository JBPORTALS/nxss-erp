import React from "react";
import Link from "next/link";
import { Ellipsis } from "lucide-react";

import { AvatarList } from "@nxss/ui/avatar-list";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@nxss/ui/card";
import { Input } from "@nxss/ui/input";
import { HStack, VStack } from "@nxss/ui/stack";

import CreateBranchDailog from "~/app/_components/dailog/create-branch-dailog";
import { api } from "~/trpc/server";

export default async function Page({
  params,
}: {
  params: {
    org: string;
  };
}) {
  const branchList = await api.branch.getBranchList();
  return (
    <VStack>
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-2 pb-8">
          <h1 className="text-2xl font-bold">Branch</h1>
          <p className="text-sm text-muted-foreground">
            Branches of Innovation , Strategies for Success
          </p>
        </div>
      </div>
      <HStack className="mb-8 w-full justify-between">
        <Input
          className="w-1/2"
          placeholder="Search by subject name or Id ..."
        />
        <CreateBranchDailog />
      </HStack>
      <div className="grid grid-cols-3 gap-10">
        {branchList && branchList.length > 0 ? (
          branchList.map((branch) => (
            <Link key={branch.id} href={`/${params.org}/branch/${branch.id}`}>
              <Card className="relative flex h-full w-full flex-col">
                <CardHeader>
                  <CardTitle className="flex items-center gap-4">
                    <VStack className="gap-0 overflow-hidden">
                      <h1 className="truncate text-lg">{branch.name}</h1>
                    </VStack>
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-grow overflow-hidden">
                  <span className="line-clamp-3 text-sm text-muted-foreground">
                    {branch.description}
                  </span>
                </CardContent>
                <CardFooter className="flex w-full justify-between border-t py-4">
                  <AvatarList
                    images={[
                      "https://avatars2.githubusercontent.com/u/263385",
                      "https://avatars2.githubusercontent.com/u/132554",
                      "https://avatars2.githubusercontent.com/u/263385",
                      "https://avatars2.githubusercontent.com/u/132554",
                    ]}
                    maxAvatars={3}
                    size="small"
                  />
                  <Ellipsis className="text-muted-foreground" />
                </CardFooter>
              </Card>
            </Link>
          ))
        ) : (
          <p>No branches available.</p> // Handle the case where branchList is empty or undefined
        )}
      </div>
    </VStack>
  );
}
