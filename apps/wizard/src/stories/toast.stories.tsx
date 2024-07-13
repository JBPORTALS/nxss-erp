import { Meta, StoryObj } from "@storybook/react";

import { Input } from "@nxss/ui/input";
import { toast, Toaster } from "@nxss/ui/toast";
import { Button } from "@nxss/ui/button";


const meta: Meta<typeof Toaster> = {
    title: "UI/Toast",
    component: Toaster,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],


} satisfies Meta<typeof Toaster>;

export default meta;

type Story = StoryObj<typeof meta>;



export const Default: Story = {
    
    args: {},
    render: (args) => {
        return (
            <Button
      variant="outline"
      onClick={() => {
        toast({
          description: "Your message has been sent.",
        })
      }}
    >
      Show Toast
    </Button>
        );

    },
};
