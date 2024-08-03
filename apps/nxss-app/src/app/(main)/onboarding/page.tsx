import React from "react";

import { Button } from "@nxss/ui/button";
import { Input } from "@nxss/ui/input";
import { Label } from "@nxss/ui/label";
import { HStack, VStack } from "@nxss/ui/stack";

export default function page() {
  return (
    <VStack className="h-full w-1/2 items-center justify-center gap-8">
      <VStack className="items-center">
        <span className="text-3xl font-semibold">Institution Details</span>
        <span className="text-muted-foreground">
          Basic details to get started with your academics.
        </span>
      </VStack>
      <VStack className="w-[400px] gap-7 text-sm">
        <VStack className="w-full">
          <Label>Name of Institution</Label>
          <Input placeholder="Enter institution name" />
        </VStack>
        <VStack className="w-full">
          <Label>Academic Year</Label>
          <Input placeholder="Enter year" />
        </VStack>
        <VStack className="w-full">
          <Label> About (optional)</Label>
          <Input placeholder="Type here..." />
          <span>Later you can edit this in profile settings.</span>
        </VStack>
        <HStack className="w-full justify-between gap-6">
          <Button className="w-full" variant={"outline"}>
            Previous
          </Button>
          <Button className="w-full">Next</Button>
        </HStack>
      </VStack>
    </VStack>
  );
}
