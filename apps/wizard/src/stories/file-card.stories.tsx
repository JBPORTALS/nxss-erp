// stories/ComboboxDemo.stories.tsx
import { Meta, StoryObj } from "@storybook/react";
import { Download } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@nxss/ui/avatar";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@nxss/ui/card";
import { HStack } from "@nxss/ui/stack";

const meta: Meta<typeof Card> = {
  title: "UI/File Card",
  component: Card,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Card>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Card>
      <CardHeader className="p-3">
        <CardTitle className="justify-between text-sm font-semibold">
          <HStack className="gap-2 truncate">
            <img src="/pdf.png" className="h-6 w-6" />
            Chapter 1 Introduction of computers
          </HStack>
          <div className="rounded-lg border p-1">
            <Download className="size-4 text-muted-foreground" />
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="mx-14 flex justify-center rounded-lg border py-10">
        <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-red-500 p-4 text-xl font-bold text-background ">
          PDF
        </div>
      </CardContent>
      <CardFooter className="gap-2 py-4 text-sm text-muted-foreground">
        <Avatar className="h-5 w-5">
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <span>Uploaded by Narayana R</span>
        <span className="">•</span>
        <span>Jan 20, 2024</span>
      </CardFooter>
    </Card>
  ),
};
