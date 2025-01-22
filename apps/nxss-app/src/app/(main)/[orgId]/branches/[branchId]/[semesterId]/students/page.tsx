import { PlusIcon } from "lucide-react";

import { Button } from "@nxss/ui/button";
import {
  ContentArea,
  ContentAreaContainer,
  ContentAreaDescription,
  ContentAreaHeader,
  ContentAreaTitle,
} from "@nxss/ui/content-area";

import { AddStudentsDialog } from "~/components/add-students-dialog";
import { StudentsDataTable } from "./data-table";
import SearchStudents from "./search-students";

export default function BranchPage() {
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
          <AddStudentsDialog>
            <Button className="font-semibold">
              <PlusIcon className="size-4" />
              Add Students
            </Button>
          </AddStudentsDialog>
        </ContentAreaHeader>
        <ContentAreaContainer>
          <SearchStudents />
          <StudentsDataTable />
        </ContentAreaContainer>
      </ContentArea>
    </div>
  );
}
