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
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@nxss/ui/select";
import { HStack, VStack } from "@nxss/ui/stack";
import { Textarea } from "@nxss/ui/textarea";

const meta: Meta = {
  title: "Admin/Invite page",
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
            <img src="/rocket.png" className="h-20 w-20" />
          </div>
          <img
            src="/Diamond-down-hat.png"
            className="absolute bottom-0 right-1/2 -z-10"
          />
        </div>
        <VStack className="h-full w-1/2 items-center justify-center gap-8">
          <VStack className="items-center">
            <span className="text-3xl font-semibold">Invite faculty</span>
            <span className="text-muted-foreground">To Partnering for Academic Excellence</span>
          </VStack>
          <VStack className="w-[400px] gap-7 text-sm">
            <VStack className="w-full">
              <Label>Emails</Label>
              <Textarea
                placeholder="Invite faculty by their names or emails"
                rows={3}
                required
                className="w-full rounded-lg border text-lg"
              />
            </VStack>
            <HStack className="w-full justify-between gap-6">
              <Button className="w-full" variant={"outline"}>
                Skip
              </Button>
              <Button className="w-full">Invite</Button>
            </HStack>
          </VStack>
        </VStack>
      </div>
    );
  },
};
