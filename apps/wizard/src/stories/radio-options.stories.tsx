import { Meta, StoryObj } from "@storybook/react";
import { Label } from "@nxss/ui/label";
import { RadioGroup, RadioGroupItem } from "@nxss/ui/radiogroup";
import { HStack } from "@nxss/ui/stack";
import { useState } from "react";
import { Check } from "lucide-react"; // Assuming you're using lucide-react for icons

const meta: Meta<typeof RadioGroup> = {
  title: "UI/Radio-Option",
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
    const [isChecked, setIsChecked] = useState(false);

    const handleClick = () => {
      setIsChecked(!isChecked);
    };

    return (
      <RadioGroup className="flex flex-col gap-4">
        <div
          className={`p-4 border-2 rounded-lg flex items-center justify-between px-4 cursor-pointer ${
            isChecked ? "border-black" : "border-gray-300"
          }`}
          onClick={handleClick}
        >
          <div className="flex items-center gap-4">
            <div
              className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                isChecked ? "border-black bg-black" : "border-gray-300"
              }`}
            >
              {isChecked && <Check size={16} color="white" />}
            </div>
            <Label className="flex flex-col gap-1.5 py-2 cursor-pointer ">
              <h1 className="font-medium text-base leading-6">Axioas</h1>
              <HStack className="font-medium text-xs leading-5">
                <p className="pt-1">Fetch all the details related to content.</p>
              </HStack>
            </Label>
          </div>
        </div>
      </RadioGroup>
    );
  },
};