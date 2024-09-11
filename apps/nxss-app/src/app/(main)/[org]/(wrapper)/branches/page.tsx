import { Ellipsis, PlusCircle, SquareDashedBottomIcon } from "lucide-react";

import { Button } from "@nxss/ui/button";
import {
  ContentArea,
  ContentAreaContainer,
  ContentAreaDescription,
  ContentAreaHeader,
  ContentAreaTitle,
} from "@nxss/ui/content-area";
import { Separator } from "@nxss/ui/seperator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@nxss/ui/table";

import CreateBranchDailog from "~/app/_components/dailog/create-branch-dailog";
import { api } from "~/trpc/server";

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
        {branchList.length === 0 ? (
          <div className="flex h-full w-full flex-col items-center justify-center gap-4">
            <SquareDashedBottomIcon className="size-12 text-muted-foreground" />
            <div className="text-center">
              <h4 className="text-xl">No branches</h4>
              <p className="text-sm text-muted-foreground">
                Create one to organize the students academic data course wise
              </p>
            </div>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Branch</TableHead>
                <TableHead>Working Staff</TableHead>
                <TableHead className="w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {branchList.map((branch) => (
                <TableRow key={branch.id}>
                  <TableCell>{branch.name}</TableCell>
                  <TableCell>{branch.semesters}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="icon">
                      <Ellipsis className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </ContentAreaContainer>
    </ContentArea>
  );
}
