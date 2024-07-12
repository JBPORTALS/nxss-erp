import { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";
import Headertabs from "@nxss/ui/headertabs";
import { HStack } from "@nxss/ui/stack";
import BranchNavItem from "@nxss/ui/branch-navitem";

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
            <div className='border-b-2 border-gray-100'>
                <HStack className='w-full gap-0 px-10 -mb-0.5 overflow-x-auto'>
                    {args.items.map((item: string, index: number) => (
                        <BranchNavItem
                            key={index}
                            isActive={index === activeIndex}
                            onClick={() => handleClick(index)}
                        >
                            {item}
                        </BranchNavItem>
                    ))}
                </HStack>
            </div>
        );
    },
};
