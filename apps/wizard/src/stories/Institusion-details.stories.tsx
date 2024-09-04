import { Meta, StoryObj } from "@storybook/react";

import { Button } from "@nxss/ui/button";
import { Input } from "@nxss/ui/input";
import { Label } from "@nxss/ui/label";
import { HStack, VStack } from "@nxss/ui/stack";

const meta: Meta = {
  title: "Admin/Institusion Details",
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

const handleChange = (selectedIndex: number | null) => {
  console.log("Selected index:", selectedIndex);
};

export const Multiple: Story = {
  args: {},
  render: () => {
    return (
      <div className="relative flex h-[851px] w-screen border">
        <div className="h-full w-1/2 border-r">
          <img
            src="/Diamond-up-hat.png"
            className="absolute left-0 top-0 -z-10"
          />
          <div className="flex h-full items-center justify-center">
            <img src="/rocket.png" className="h-20 w-20 " />
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
      </div>
    );
  },
};
