import React from "react";

import { Button } from "@nxss/ui/button";
import { HStack, VStack } from "@nxss/ui/stack";

import { AllocateStaffDialog } from "~/app/_components/dailog/allocate-staff-dialog";
import AllocationsListComponent from "~/app/_components/data-table/allocation-datatable";

export default async function Allocations() {
  return (
    <div className="w-full">
      {" "}
      <HStack className="w-full justify-between">
        <VStack className="gap-2">
          <h1 className="text-2xl font-bold">Allocations</h1>
          <span className="text-muted-foreground">
            Allocate the subject Fundamentals of computers to staff members.
          </span>
        </VStack>
        <AllocateStaffDialog>
          <Button>Allocate Staff</Button>
        </AllocateStaffDialog>
      </HStack>
      <hr className="my-5 w-full"></hr>
      <VStack className="w-full">
        <AllocationsListComponent />
      </VStack>
    </div>
  );
}
