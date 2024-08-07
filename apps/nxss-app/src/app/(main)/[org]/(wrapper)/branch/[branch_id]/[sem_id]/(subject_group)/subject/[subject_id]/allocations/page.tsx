import React from "react";

import { VStack } from "@nxss/ui/stack";

export default async function Allocations() {
  return (
    <div className="w-full">
      {" "}
      <VStack className="gap-2">
        <h1 className="text-2xl font-bold">Allocations</h1>
        <span className="text-muted-foreground">
          Allocate the subject Fundamentals of computers to staff members.
        </span>
      </VStack>
      <hr className="my-5 w-full"></hr>
      <VStack className="w-full"></VStack>
    </div>
  );
}
