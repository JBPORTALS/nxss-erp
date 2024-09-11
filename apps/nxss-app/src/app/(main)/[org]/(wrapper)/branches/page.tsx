import React from "react";
import Link from "next/link";
import { Ellipsis, PlusCircle, SquareDashedBottomIcon } from "lucide-react";

import { AvatarList } from "@nxss/ui/avatar-list";
import { Button } from "@nxss/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@nxss/ui/card";
import {
  ContentArea,
  ContentAreaContainer,
  ContentAreaDescription,
  ContentAreaHeader,
  ContentAreaTitle,
} from "@nxss/ui/content-area";
import { Separator } from "@nxss/ui/seperator";
import { VStack } from "@nxss/ui/stack";

import { BranchSearch } from "~/app/_components/branchsearch-client";
import CreateBranchDailog from "~/app/_components/dailog/create-branch-dailog";
import { api } from "~/trpc/server"; // Import the Client Component

export default async function Page({
  params,
  searchParams,
}: {
  params: {
    org: string;
  };
  searchParams: {
    searchTerm?: string;
  };
}) {
  const { searchTerm = "" } = searchParams;
  const branchList = await api.branch.getBranchList({ searchTerm });

  return (
    <ContentArea className="h-full">
      <ContentAreaHeader className="flex-row justify-between">
        <div className="space-y-2">
          <ContentAreaTitle>Branches</ContentAreaTitle>
          <ContentAreaDescription>
            Space for the students regarding their selected course
          </ContentAreaDescription>
        </div>
        <CreateBranchDailog>
          <Button>
            Create <PlusCircle className="size-4" />
          </Button>
        </CreateBranchDailog>
      </ContentAreaHeader>
      <Separator />
      <ContentAreaContainer className="h-full w-full">
        <div className="flex h-full w-full flex-col items-center justify-center gap-4">
          <SquareDashedBottomIcon className="size-12 text-muted-foreground" />
          <div className="text-center">
            <h4 className="text-xl">No branches</h4>
            <p className="text-sm text-muted-foreground">
              Create one to organize the students academic data course wise
            </p>
          </div>
        </div>
      </ContentAreaContainer>
    </ContentArea>
  );
}
