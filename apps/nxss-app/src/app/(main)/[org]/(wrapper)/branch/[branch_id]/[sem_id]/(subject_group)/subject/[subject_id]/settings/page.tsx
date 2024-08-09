import React from "react";

import { Button } from "@nxss/ui/button";
import { ColorDot } from "@nxss/ui/color-dot";
import { Input } from "@nxss/ui/input";
import { Label } from "@nxss/ui/label";
import { HStack, VStack } from "@nxss/ui/stack";
import { Textarea } from "@nxss/ui/textarea";

export default function Settings() {
  return (
    <div className="w-full">
      {" "}
      <VStack className="w-full gap-2">
        <h1 className="text-2xl font-bold">Settings</h1>
        <span className="text-muted-foreground">
          An journey throughout space with engineering
        </span>
      </VStack>
      <hr className="my-5 w-full"></hr>
      <VStack className="w-full gap-9">
        <VStack>
          <Label>Color</Label>
          <ColorDot number={4} enablePopover={true} />

          <Label>Name</Label>

          <Input defaultValue={"Fundamentals of computer"} className="w-96" />
        </VStack>
        <VStack>
          {" "}
          <Label>Description</Label>
          <Textarea
            className="h-24 w-96"
            defaultValue={
              "Fundamentals of computers cover the core principles and essential components of digital technology and computing systems."
            }
          />
        </VStack>
        <Button size={"lg"}>Save details</Button>
      </VStack>
      <hr className="my-5 w-full"></hr>
      <VStack className="w-full gap-8">
        <VStack>
          <span className="text-lg font-semibold text-red-500">
            Clear data of semester
          </span>
          <p className="w-2/3 text-muted-foreground">
            Clearing all data of{" "}
            <span className="text-foreground">Fundamentals of computers</span>{" "}
            will permanently erase all data and this action is{" "}
            <span className="text-red-500">permanent and irreversible.</span>
          </p>
        </VStack>
        <Button size={"lg"} variant={"destructive_outline"}>
          Clear Data
        </Button>
      </VStack>
    </div>
  );
}
