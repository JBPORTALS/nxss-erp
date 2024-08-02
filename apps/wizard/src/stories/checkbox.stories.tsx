import { Meta, StoryObj } from "@storybook/react";
import { userEvent, within } from "@storybook/test";
import { Checkbox } from "@nxss/ui/checkbox";

const meta: Meta<typeof Checkbox> = {
  title: "UI/Checkbox",
  component: Checkbox,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Checkbox>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
  render: () => {
    return (
      <div className="flex items-center space-x-2">
        <Checkbox id="terms" />
        <label
          htmlFor="terms"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Yes
        </label>
      </div>
    );
  },
};

Default.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  const checkbox = await canvas.getByLabelText("Yes");

  await userEvent.click(checkbox);
};


