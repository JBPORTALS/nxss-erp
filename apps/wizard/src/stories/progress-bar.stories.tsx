import { Meta, StoryObj } from "@storybook/react";
import { ProgressDemo } from "@nxss/ui/progress-bar";

const meta: Meta<typeof ProgressDemo> = {
  title: "UI/Progress-Bar",
  component: ProgressDemo,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ProgressDemo>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
  render: (args) => {
    return <ProgressDemo />;
  },
};
