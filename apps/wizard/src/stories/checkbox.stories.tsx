import { Meta, StoryObj } from "@storybook/react";
import { Checkbox } from "@nxss/ui/checkbox";


const meta: Meta<typeof Checkbox> = {
    title: "UI/Checkbox",
    component: Checkbox,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],


} satisfies Meta<typeof Checkbox>;

export default meta;

type Story = StoryObj<typeof meta>;



export const Default: Story = {
    args: {},
    render: (args) => {
        return (
            <Checkbox />
        );

    },
};
