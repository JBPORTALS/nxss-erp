// stories/ComboboxDemo.stories.tsx
import { Meta, StoryObj } from "@storybook/react";
import { EllipsisVertical } from "lucide-react";

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
    title: "UI/Circular Staff",
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
        const [isExpanded, setIsExpanded] = useState(false);
        const content = "The Workshops and Seminars are designed to provide participants with in-depth knowledge, practical skills. MANXKJashxiusdgcjszxbcjhdscghdckjsnkjscnkhdfurhkjb ,zsjdshikdhckjb cznlcaisuich,zzzzzzncjdhksojkxzlm,kcdiflzcm,dnckjzck";

        const truncatedContent = content.length > MAX_CONTENT_LENGTH
            ? content.slice(0, MAX_CONTENT_LENGTH) + "..."
            : content;

        const toggleContent = () => setIsExpanded(!isExpanded);

        return (
            <Card className="w-96">
                <CardHeader className="p-3">
                    <CardTitle className="justify-between text-sm font-semibold">
                        <HStack className="gap-2 truncate">
                            <img src="/pdf.png" className="h-6 w-6" />
                            Exam Schedules and Guidelines
                        </HStack>
                    </CardTitle>
                </CardHeader>
                <div className="px-3 py-1 border-t">
                    <h2 className="text-sm font-semibold">Aerospace Engineering . Semester 2</h2>
                </div>
                <CardContent className="p-3">
                    <p className="text-xs text-muted-foreground">
                        {isExpanded ? content : truncatedContent}
                        {content.length > MAX_CONTENT_LENGTH && (
                            <button
                                onClick={toggleContent}
                                className="ml-1 text-blue-500 hover:underline focus:outline-none"
                            >
                                {isExpanded ? "Read less" : "Read more"}
                            </button>
                        )}
                    </p>
                </CardContent>
                <CardFooter className="gap-2 py-4 text-sm text-muted-foreground border-t flex justify-between items-center">
                    <div className="flex justify-between gap-2">
                        <Avatar className="h-5 w-5">
                            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <span>Uploaded by you</span>
                    </div>
                    <span>Jan 20, 2024</span>
                </CardFooter>
            </Card>
        );
    },
};
