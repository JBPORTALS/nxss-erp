import { Button } from "@nxss/ui/button";
import {
  ContentArea,
  ContentAreaContainer,
  ContentAreaDescription,
  ContentAreaHeader,
  ContentAreaTitle,
} from "@nxss/ui/content-area";
import { Separator } from "@nxss/ui/seperator";

import { Action, DataTable } from "~/app/_components/data-table";
import { api } from "~/trpc/server";
import { actions } from "./actions";
import { columns, Student } from "./columns";

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
  // Function to generate a consistent color based on the name
  // const getAvatarColor = (name: string) => {
  //   let hash = 0;
  //   for (let i = 0; i < name.length; i++) {
  //     hash = name.charCodeAt(i) + ((hash << 5) - hash);
  //   }
  //   const hue = hash % 360;
  //   return `hsl(${hue}, 70%, 80%)`;
  // };

  return (
    <ContentArea>
      <ContentAreaHeader className="flex flex-row justify-between">
        <div className="space-y-2">
          <ContentAreaTitle>Profiles</ContentAreaTitle>
          <ContentAreaDescription>
            All Students in computer Science
          </ContentAreaDescription>
        </div>
        <Button>Import</Button>
      </ContentAreaHeader>
      <Separator />
      <ContentAreaContainer>
        <DataTable actions={actions} columns={columns} data={data} />
      </ContentAreaContainer>
    </ContentArea>
  );
};

export default SectionsAndBatchesTable;
