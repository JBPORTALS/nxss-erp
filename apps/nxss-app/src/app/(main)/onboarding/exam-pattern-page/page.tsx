import { Button } from "@nxss/ui/button";
import { Input } from "@nxss/ui/input";
import { Label } from "@nxss/ui/label";
import {
  RadioGroup,
  RadioGroupContainer,
  RadioGroupItem,
} from "@nxss/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@nxss/ui/select";
import { HStack, VStack } from "@nxss/ui/stack";
import React from "react";

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
          <RadioGroup>
            <Label>Pattern</Label>
            <RadioGroupContainer value="rr">
              <RadioGroupItem />
              <VStack className="gap-1">
                <h1>Semester</h1>
                <p className="text-sm text-muted-foreground">
                  Every 6 months considered as one semester.
                </p>
              </VStack>
            </RadioGroupContainer>
            <RadioGroupContainer value="tt">
              <RadioGroupItem />
              <VStack className="gap-1">
                <h1>Year</h1>
                <p className="text-sm text-muted-foreground">
                  Every 12 months considered as one Year.
                </p>
              </VStack>
            </RadioGroupContainer>
          </RadioGroup>
          <VStack className="w-full">
            <Label> Number of Semesters</Label>
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="1">Sem 1</SelectItem>
                  <SelectItem value="2">Sem 2</SelectItem>
                  <SelectItem value="3">Sem 3</SelectItem>
                  <SelectItem value="4">Sem 4</SelectItem>
                  <SelectItem value="5">Sem 5</SelectItem>
                  <SelectItem value="6">Sem 6</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
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
