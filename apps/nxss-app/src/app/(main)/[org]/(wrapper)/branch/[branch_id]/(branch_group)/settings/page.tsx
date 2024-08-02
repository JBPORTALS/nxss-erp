import React from "react";

import { Button } from "@nxss/ui/button";
import { Input } from "@nxss/ui/input";
import { Label } from "@nxss/ui/label";
import { VStack } from "@nxss/ui/stack";
import { Textarea } from "@nxss/ui/textarea";

export default function page() {
  return (
    <div>
      <VStack className="w-full gap-8">
        <VStack className="w-96">
          <Label>Name of the Branch</Label>
          <Input defaultValue={"Aerospace Engg"} />
        </VStack>
        <VStack className="w-96">
          <Label>Description</Label>
          <Textarea
            rows={4}
            placeholder="A journey throughout the space is Aerospace engineering"
          />
        </VStack>
        <div className="h-10 w-64">
          <Button className="h-full w-full">Save details</Button>
        </div>
        <hr className="w-full"></hr>
        <VStack className="gap-1">
          <span className="text-xl font-semibold text-red-500">
            Delete Branch
          </span>
          <p>
            Deleting <b>Aerospace Engg</b> branch will permanently erase
            all data included in this branch and this action is permanent and
            irreversible.
          </p>
        </VStack>
        <Button variant={"destructive_outline"} size={"lg"}>Delete Branch</Button>
      </VStack>
    </div>
  );
}
