import { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";

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

const meta: Meta = {
  title: "Admin/Exam Pattern Page",
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Multiple: Story = {
  args: {},
  render: ({ selectedPattern }) => {
    return (
      <div className="relative flex h-[851px] w-screen border">
        <div className="h-full w-1/2 border-r">
          <img
            src="/Diamond-up-hat.png"
            className="absolute left-0 top-0 -z-10"
          />
          <div className="flex h-full items-center justify-center">
            <img src="/rocket.png" className="h-20 w-20" />
          </div>
          <img
            src="/Diamond-down-hat.png"
            className="absolute bottom-0 right-1/2 -z-10"
          />
        </div>
        <VStack className="h-full w-1/2 items-center justify-center gap-8">
          <VStack className="items-center">
            <span className="text-3xl font-semibold">Institution Details</span>
            <span className="text-muted-foreground">
              Basic details to get started with your academics.
            </span>
          </VStack>
          <VStack className="w-[400px] gap-7 text-sm">
            <>
              {" "}
              <RadioGroup defaultValue={selectedPattern}>
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
              {selectedPattern && (
                <VStack className="w-full">
                  <Label>
                    {selectedPattern === "rr"
                      ? "Number of Semesters"
                      : "Number of Years"}
                  </Label>
                  <Select>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {selectedPattern === "rr" ? (
                          <>
                            <SelectItem value="1">Sem 1</SelectItem>
                            <SelectItem value="2">Sem 2</SelectItem>
                            <SelectItem value="3">Sem 3</SelectItem>
                            <SelectItem value="4">Sem 4</SelectItem>
                            <SelectItem value="5">Sem 5</SelectItem>
                            <SelectItem value="6">Sem 6</SelectItem>
                          </>
                        ) : (
                          <>
                            <SelectItem value="1">Year 1</SelectItem>
                            <SelectItem value="2">Year 2</SelectItem>
                            <SelectItem value="3">Year 3</SelectItem>
                            <SelectItem value="4">Year 4</SelectItem>
                          </>
                        )}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </VStack>
              )}
            </>
            <HStack className="w-full justify-between gap-6">
              <Button className="w-full" variant={"outline"}>
                Previous
              </Button>
              <Button className="w-full">Next</Button>
            </HStack>
          </VStack>
        </VStack>
      </div>
    );
  },
};
