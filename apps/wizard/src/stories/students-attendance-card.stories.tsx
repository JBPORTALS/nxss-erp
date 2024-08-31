// stories/ComboboxDemo.stories.tsx
import { Meta, StoryObj } from "@storybook/react";

import { Avatar, AvatarFallback, AvatarImage } from "@nxss/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@nxss/ui/card";
import { HStack } from "@nxss/ui/stack";
import { useState } from "react";

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
const MAX_CONTENT_LENGTH = 100; // Adjust this value to change when truncation occurs

export const Default: Story = {
  render: () => {
    
    return (
        <Card className="w-full">
          <CardHeader className="flex flex-row items-center gap-3 p-4">
            <Avatar className="h-12 w-12">
              <AvatarImage src="/path-to-rayn-image.jpg" alt="Rayn Reynolds" />
              <AvatarFallback>RR</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <h2 className="text-lg font-semibold">Rayn Reynolds</h2>
              <p className="text-sm text-muted-foreground">364CS18923</p>
            </div>
          </CardHeader>
          <CardContent className="p-4">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-sm text-muted-foreground">Total Sessions</p>
                <p className="text-2xl font-bold">60</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Attended</p>
                <p className="text-2xl font-bold">30</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Percentage</p>
                <p className="text-2xl font-bold">50%</p>
              </div>
            </div>
          </CardContent>
          <CardFooter className="p-4">
            <p className="text-sm text-muted-foreground">
              30 sessions has been not attended
            </p>
          </CardFooter>
        </Card>
      );
    }
}