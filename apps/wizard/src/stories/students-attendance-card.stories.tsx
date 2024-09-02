// stories/ComboboxDemo.stories.tsx
import { Card } from "@nxss/ui/card";
import { Meta, StoryObj } from "@storybook/react";
import {AttendanceCard} from "@nxss/ui/attendance-card";

const meta: Meta<typeof Card> = {
  title: "UI/attendance-student-card",
  component: Card,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Card>;

export default meta;

type Story = StoryObj<typeof meta>;
// Adjust this value to change when truncation occurs

export const Default: Story = {
  render: () => {

    return (
      <AttendanceCard />
    );
  }
}