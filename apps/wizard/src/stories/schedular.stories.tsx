import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { Scheduler } from "@nxss/ui/schedular";

const meta: Meta<typeof Scheduler> = {
  title: "UI/Scheduler",
  render: (args) => {
    const [date, setDate] = React.useState<Date>();

    const [events] = React.useState([
      {
        title: "Ethnic day",
        start: new Date(2024, 5, 4, 9, 0),
        end: new Date(2024, 5, 4, 12, 30),
        color: "green",
      },
      {
        title: "Picknic day",
        start: new Date(2024, 5, 4),
        end: new Date(2024, 5, 4),
        color: "green",
      },
      {
        title: "Panic day",
        start: new Date(2024, 5, 4),
        end: new Date(2024, 5, 4),
        color: "green",
      },
      {
        title: "Rose day",
        start: new Date(2024, 5, 4),
        end: new Date(2024, 5, 4),
        color: "green",
      },
      {
        title: "Bakrid",
        start: new Date(2024, 5, 11),
        end: new Date(2024, 5, 11),
        color: "blue",
      },
      {
        title: "Seminars",
        start: new Date(2024, 5, 18),
        end: new Date(2024, 5, 18),
        color: "yellow",
      },
      {
        title: "UGC Exam",
        start: new Date(2024, 5, 25, 9, 0),
        end: new Date(2024, 5, 25, 12, 0),
        color: "red",
      },
    ]);
    return <Scheduler className="h-[980px]" />;
  },
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
