import { Meta, StoryObj } from "@storybook/react";
import {
  RadioGroup,
  RadioGroupContainer,
  RadioGroupItem,
} from "@nxss/ui/radio-group";
import { HStack, VStack } from "@nxss/ui/stack";

const meta: Meta<typeof RadioGroup> = {
  title: "UI/Radio-option",
  component: RadioGroup,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof RadioGroup>;

export default meta;

type Story = StoryObj<typeof RadioGroup>;

export const Default: Story = {
  args: {},
  render: () => {
    return (
      <RadioGroup>
        <RadioGroupContainer value="rr" >
          <RadioGroupItem  />
          <VStack className="gap-1">
            <h1 className="text-base font-medium leading-6">Semester</h1>
            <p className="pt-1 text-xs font-medium leading-5">
              Fetch all the details related to content.
            </p>
          </VStack>
        </RadioGroupContainer>
        <RadioGroupContainer value="tt">
          <RadioGroupItem  />
          <VStack className="gap-1">
            <h1 className="text-base font-medium leading-6">Semester</h1>
            <p className="pt-1 text-xs font-medium leading-5">
              Fetch all the details related to content.
            </p>
          </VStack>
        </RadioGroupContainer>
      </RadioGroup>
    );
  },
};
