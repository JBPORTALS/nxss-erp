import { AccordionDemo } from "@nxss/ui/accordiondemo";
import { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@nxss/ui/accordion";
import { PlusCircle } from "lucide-react";
import {NavItem} from "@nxss/ui/nav-item";

const meta: Meta<typeof AccordionDemo> = {
    title: "UI/Accordion",
    component: AccordionDemo,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
    args: { 
        onClick: fn(),
        // titles: ["Artificial Intelligence", "Computer Science", "Mechanical Engg."],
        // semesters: [
        //     ["AI Semester 1", "AI Semester 2", "AI Semester 3"],
        //     ["CS Semester 1", "CS Semester 2", "CS Semester 3"],
        //     ["ME Semester 1", "ME Semester 2", "ME Semester 3"]
        // ]
    },
    // argTypes: {
    //     titles: { control: { type: 'array' } },
    //     semesters: { control: { type: 'object' } }
    // }
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Multiple: Story = {
    args: {},
    render: (args) => {
        const { titles, semesters } = args as { titles: string[]; semesters: string[][] };
        return (
            <div className="w-56">
                {/* <Accordion type="single" collapsible className="w-full">
                    {titles.map((title, idx) => (
                        <AccordionItem value={`item-${idx + 1}`} key={idx}>
                            <AccordionTrigger><PlusCircle />{title}</AccordionTrigger>
                            <AccordionContent>
                                {semesters[idx].map((semester, index) => (
                                    <NavItem key={index}>{semester}</NavItem>
                                ))}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion> */}
                <AccordionDemo />
            </div>
        );
    },
};
