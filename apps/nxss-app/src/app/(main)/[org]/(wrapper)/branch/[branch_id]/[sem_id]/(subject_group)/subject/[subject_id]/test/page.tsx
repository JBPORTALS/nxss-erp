import React from "react";

import { VStack } from "@nxss/ui/stack";

import StudentTestTable from "~/app/_components/data-table/student-test-datatable";

export default function Test() {
  return (
    <div className="w-full">
      {" "}
      <VStack className="gap-2">
        <h1 className="text-2xl font-bold">Tests</h1>
        <span className="text-muted-foreground">
          Test Guidelines and Requirements.
        </span>
      </VStack>
      <hr className="my-5 w-full"></hr>
      <VStack className="w-full">
        <StudentTestTable />
      </VStack>
    </div>
  );
}
