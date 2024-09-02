import { Meta, StoryObj } from "@storybook/react";

import { Dialog } from "@nxss/ui/dialog";

import AttendanceFilter from "@nxss/ui/attendance-filter";

const meta: Meta<typeof Dialog> = {
  title: "UI/Attendance filter",
  component: Dialog,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Dialog>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
  render: (args) => {
    return (
     <AttendanceFilter />
    );
  }
}