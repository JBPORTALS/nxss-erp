import { Button } from "@nxss/ui/button";
import {
  ContentArea,
  ContentAreaContainer,
  ContentAreaDescription,
  ContentAreaHeader,
  ContentAreaTitle,
} from "@nxss/ui/content-area";
import { Separator } from "@nxss/ui/seperator";

import { api } from "~/trpc/server";
import { Student, useColumns } from "./columns";
import { DataTableClient } from "./data-table";
import { ImportExcelComponent } from "./import-students";

async function getData({
  branchId,
  semesterId,
}: {
  branchId: number;
  semesterId: number;
}): Promise<Student[]> {
  // Fetch data from your API here.
  return api.students.getStudentsByBranchAndSemester({ branchId, semesterId });
}

const SectionsAndBatchesTable = async ({
  params,
}: {
  params: { branch_id: string; semester_id: string };
}) => {
  const data = await getData({
    branchId: parseInt(params.branch_id),
    semesterId: parseInt(params.semester_id),
  });

  return (
    <ContentArea>
      <ContentAreaHeader className="flex flex-row justify-between">
        <div className="space-y-2">
          <ContentAreaTitle>Profiles</ContentAreaTitle>
          <ContentAreaDescription>
            All Students in computer Science
          </ContentAreaDescription>
        </div>
        <ImportExcelComponent
          branchId={parseInt(params.branch_id)}
          semesterId={parseInt(params.semester_id)}
        />
      </ContentAreaHeader>
      <Separator />
      <ContentAreaContainer>
        <DataTableClient data={data} />
      </ContentAreaContainer>
    </ContentArea>
  );
};

export default SectionsAndBatchesTable;
