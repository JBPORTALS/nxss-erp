import {
  ContentArea,
  ContentAreaContainer,
  ContentAreaDescription,
  ContentAreaHeader,
  ContentAreaTitle,
} from "@nxss/ui/content-area";
import { Separator } from "@nxss/ui/seperator";

import { api } from "~/trpc/server";
import { Student } from "./columns";
import { DataTableClient } from "./data-table";

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
  const data = await api.students.getInactiveProfiles({
    branchId: parseInt(params.branch_id),
    semesterId: parseInt(params.semester_id),
    limit: 10,
    offset: 0,
  });

  return (
    <ContentArea>
      <ContentAreaHeader className="flex flex-row justify-between">
        <div className="space-y-2">
          <ContentAreaTitle>Inactive Profiles</ContentAreaTitle>
          <ContentAreaDescription>
            All inactive students in computer Science
          </ContentAreaDescription>
        </div>
      </ContentAreaHeader>
      <Separator />
      <ContentAreaContainer>
        <DataTableClient data={data.students} />
      </ContentAreaContainer>
    </ContentArea>
  );
};

export default SectionsAndBatchesTable;
