import { Meta, StoryObj } from "@storybook/react";

import { Scheduler } from "@nxss/ui/schedular";

const meta: Meta<typeof Scheduler> = {
  title: "UI/Scheduler",
  component: Scheduler,
  parameters: {
    layout: "full",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Scheduler>;

export default meta;

type Story = StoryObj<typeof Scheduler>;

export const Default: Story = {
  args: {},
};
