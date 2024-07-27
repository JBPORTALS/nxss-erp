import { Meta, StoryObj } from "@storybook/react";
import { Progress } from "@nxss/ui/progress";

const meta: Meta<typeof Progress> = {
  title: "UI/Progress-Bar",
  component: Progress,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Progress>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
  render: (args) => {
    return <Progress value={33} />;
  },
};
