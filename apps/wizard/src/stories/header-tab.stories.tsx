import { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";
import Headertabs from "@nxss/ui/headertabs";
import TabList, { Tabs } from "node_modules/@nxss/ui/src/tabs";

const meta: Meta<typeof Headertabs> = {
    title: "UI/Headertabs",
    component: Headertabs,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
    args: {
        items: ['Overview', 'Subjects', 'Sessions', 'Setting'],
    },
    argTypes: {
        items: {
            control: {
                type: 'array',
            },
            defaultValue: ['Overview', 'Subjects', 'Sessions', 'Setting'],
        },
    },
} satisfies Meta<typeof Headertabs>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {},
    render: (args) => {
        const [activeIndex, setActiveIndex] = useState(0);

        const handleClick = (index: number) => {
            setActiveIndex(index);
        };

        return (
            <Tabs>
                {args.items.map((item: string, index: number) => (
                    <TabList
                        key={index}
                        isActive={index === activeIndex}
                        onClick={() => handleClick(index)}
                    >
                        {item}
                    </TabList>
                ))}
            </Tabs>
        );
    },
};
