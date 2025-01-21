import { PlusIcon, SearchIcon } from "lucide-react";

import { Button } from "@nxss/ui/button";
import {
  ContentArea,
  ContentAreaContainer,
  ContentAreaDescription,
  ContentAreaHeader,
  ContentAreaTitle,
} from "@nxss/ui/content-area";
import { Input } from "@nxss/ui/input";

import { DataTable } from "~/components/data-table";
import { StudentColumns } from "./columns";
import { StudentsDataTable } from "./data-table";

export default async function BranchPage({}: {
  params: { branch_id: string; org: string };
}) {
  return (
    <div className="flex h-screen">
      <ContentArea>
        <ContentAreaHeader className="flex-row items-center justify-between">
          <div className="flex flex-col gap-1">
            <ContentAreaTitle>Students</ContentAreaTitle>
            <ContentAreaDescription>
              All student in this branch & semester
            </ContentAreaDescription>
          </div>
          <Button className="font-semibold">
            <PlusIcon className="size-4" />
            Add Students
          </Button>
        </ContentAreaHeader>
        <ContentAreaContainer>
          <div className="flex w-full gap-3">
            <div className="relative flex w-full items-center">
              <SearchIcon className="absolute ml-2.5 mr-2.5 size-4 text-muted-foreground" />
              <Input placeholder="Search ..." className="h-9 w-full ps-9" />
            </div>
          </div>
          <StudentsDataTable />
        </ContentAreaContainer>
      </ContentArea>
    </div>
  );
}
