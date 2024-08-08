import React from "react";

import { Button } from "@nxss/ui/button";
import { HStack, VStack } from "@nxss/ui/stack";

export default function Settings() {
  return (
    <VStack className="w-full gap-8">
      <VStack>
        <span className="text-lg font-semibold">Complete Semester</span>
        <p className="w-2/3 text-muted-foreground">
          Completing the semester will make the data within the{" "}
          <span className="text-foreground">
            {"Aerospace engineering > semester 2"}
          </span>{" "}
          non-editable. This action is irresavable.
        </p>
      </VStack>
      <Button size={"lg"}>Complete Semester</Button>
      <hr className="w-full"></hr>
      <VStack>
        <span className="text-lg font-semibold text-red-500">
          Clear data of semester
        </span>
        <p className="w-2/3 text-muted-foreground">
          Clearing all data of{" "}
          <span className="text-foreground">
            {"Aerospace engineering > semester 2"}
          </span>{" "}
          will permanently erase all data and this action is{" "}
          <span className="text-red-500">permanent and irreversible.</span>
        </p>
      </VStack>
      <Button size={"lg"} variant={"destructive_outline"}>
        Clear Data
      </Button>
    </VStack>
  );
}
