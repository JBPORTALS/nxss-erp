import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { Event, EventProps, Scheduler } from "@nxss/ui/schedular";

const meta: Meta<typeof Scheduler> = {
  title: "UI/Scheduler",
  render: (args) => {
    const [events] = React.useState<Event[]>([
      {
        title: "Ethnic day",
        start: new Date(2024, 5, 4, 9, 0),
        end: new Date(2024, 5, 4, 12, 30),
        allDay: true,
      },
      {
        title: "Picknic day",
        start: new Date(2024, 5, 4),
        end: new Date(2024, 5, 4),
      },
      {
        title: "Panic day",
        start: new Date(2024, 5, 4),
        end: new Date(2024, 5, 4),
      },
      {
        title: "Rose day",
        start: new Date(2024, 5, 4),
        end: new Date(2024, 5, 4),
      },
      {
        title: "Flower day",
        start: new Date(2024, 5, 4),
        end: new Date(2024, 5, 4),
      },
      {
        title: "Bakrid",
        start: new Date(2024, 5, 11),
        end: new Date(2024, 5, 11),
      },
      {
        title: "Seminars",
        start: new Date(2024, 5, 18),
        end: new Date(2024, 5, 18),
      },
      {
        title: "UGC Exam",
        start: new Date(2024, 5, 25, 9, 0),
        end: new Date(2024, 5, 25, 12, 0),
      },
    ]);
    return (
      <Scheduler
        defaultDate={new Date(2024, 5, 4)}
        events={events}
        className="h-[980px]"
        {...args}
      />
    );
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
