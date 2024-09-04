import React from "react";

import { VStack } from "@nxss/ui/stack";

import StudentTestTable from "~/app/_components/data-table/student-test-datatable";

export default function Test() {
  return (
    <div className="w-full">
      <VStack className="w-full">
        <StudentTestTable />
      </VStack>
    </div>
  );
}
