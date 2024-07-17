import { Meta, StoryObj } from "@storybook/react";
import { ComboboxDemo } from "@nxss/ui/combobox";


const meta: Meta<typeof ComboboxDemo> = {
    title: "UI/ComboboxDemo",
    component: ComboboxDemo,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],


} satisfies Meta<typeof ComboboxDemo>;

export default meta;

type Story = StoryObj<typeof meta>;



export const Default: Story = {
    args: {},
    render: () => {
        return (
            <ComboboxDemo />
        );

    },
};
