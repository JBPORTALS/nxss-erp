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
import { Tabs, TabsList, TabsTrigger } from "@nxss/ui/tabs";

import CreateSubjectDailog from "~/components/create-subject-dialog";
import { DataTable } from "~/components/data-table";
import { api } from "~/trpc/server";
import { StudentColumns } from "./columns";
import { StudentsDataTable } from "./data-table";

export default async function BranchPage({
  params,
}: {
  params: { subjectId: string };
}) {
  const subject = await api.subjects.getById({ subjectId: params.subjectId });
  return (
    <div className="flex h-screen">
      <ContentArea>
        <ContentAreaHeader className="flex-row items-center justify-between">
          <div className="flex flex-col gap-2">
            <ContentAreaTitle>{subject?.title}</ContentAreaTitle>
          </div>
        </ContentAreaHeader>
        <ContentAreaContainer className="flex h-full w-full items-center justify-center">
          <p className="w-1/2 text-center text-xl text-muted-foreground">
            Subject related functionalities like attendance, marks, etc. will be
            available here.
          </p>
        </ContentAreaContainer>
      </ContentArea>
    </div>
  );
}
