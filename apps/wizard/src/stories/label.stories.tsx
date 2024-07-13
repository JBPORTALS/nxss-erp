import { Meta, StoryObj } from "@storybook/react";
import { Label } from "@nxss/ui/label";


const meta: Meta<typeof Label> = {
    title: "UI/Label",
    component: Label,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],


} satisfies Meta<typeof Label>;

export default meta;

type Story = StoryObj<typeof meta>;



export const Default: Story = {
    args: {},
    render: (args) => {
        return (
            <Label htmlFor="email">Your email address</Label>
        );

    },
};
