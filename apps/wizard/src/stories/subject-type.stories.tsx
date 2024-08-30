import { Meta, StoryObj } from "@storybook/react";

import { Button } from "@nxss/ui/button";
import { Input } from "@nxss/ui/input";
import { Label } from "@nxss/ui/label";
import { HStack, VStack } from "@nxss/ui/stack";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@nxss/ui/dialog";

const meta: Meta = {
    title: "Admin/Subject Details",
    tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

const handleChange = (selectedIndex: number | null) => {
    console.log("Selected index:", selectedIndex);
};

export const Multiple: Story = {
    args: {},
    render: () => {
        return (
            <div className="relative flex h-[851px] w-screen border">
                <div className="h-full w-1/2 border-r">
                    <img
                        src="/Diamond-up-hat.png"
                        className="absolute left-0 top-0 -z-10"
                    />
                    <div className="flex h-full items-center justify-center">
                        <img src="/rocket.png" className="h-20 w-20 " />
                    </div>
                    <img
                        src="/Diamond-down-hat.png"
                        className="absolute bottom-0 right-1/2 -z-10"
                    />
                </div>
                <VStack className="h-full w-1/2 items-center justify-center gap-8">
                    <VStack className="items-center">
                        <span className="text-3xl font-semibold">Subject Type</span>
                        <span className="text-muted-foreground text-sm w-4/5">
                            Criteria and Standards for Subject Classification and Marking</span>

                        <span className="text-muted-foreground  w-4/5 text-xs">
                            At Least One Subject Type Is Required , You Can Update the Details Later in Setting page. </span>
                    </VStack>
                    <VStack className="w-[400px] gap-7 text-sm">
                        <VStack className="w-full items-center">

                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button variant="outline">Add Subject</Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[425px]">
                                    <DialogHeader>
                                        <DialogTitle>Add Subject Type</DialogTitle>
                                        <DialogDescription>
                                            Adding the new subject type
                                        </DialogDescription>
                                    </DialogHeader>
                                    <div className="grid gap-4 py-4">
                                        <div className="flex flex-col gap-2 w-full">
                                            <Label htmlFor="subjectType">Subject Type</Label>
                                            <Input
                                                id="subjectType"
                                                placeholder="Enter Subject Type"
                                                className="w-full"
                                            />
                                        </div>
                                    </div>
                                    <DialogFooter>
                                        <Button type="submit" className="">Add Subject Type</Button>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>
                        </VStack>
                        <HStack className="w-full gap-0">
                            <Input className="rounded-e-none border-e-0" defaultValue="Theory" />
                            <div className="w-8 h-full border border-s-0 rounded-lg rounded-s-none"></div>
                        </HStack>
                        <HStack className="w-full gap-0">
                            <Input className="rounded-e-none border-e-0" defaultValue="Theory" />
                            <div className="w-8 h-full border border-s-0 rounded-lg rounded-s-none"></div>
                        </HStack>
                        <HStack className="w-full justify-between gap-6">
                            <Button className="w-full" variant={"outline"}>
                                Previous
                            </Button>
                            <Button className="w-full">Next</Button>
                        </HStack>
                    </VStack>
                </VStack>
            </div>
        );
    },
};
