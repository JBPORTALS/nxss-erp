import React from "react";

import { Button } from "@nxss/ui/button";
import { ColorDot } from "@nxss/ui/color-dot";
import { Input } from "@nxss/ui/input";
import { Label } from "@nxss/ui/label";
import { HStack, VStack } from "@nxss/ui/stack";
import { Textarea } from "@nxss/ui/textarea";

export default function Settings() {
    return (
        <div className="w-full">
            {" "}


            <VStack className="w-full gap-9">
                <VStack>


                    <Label>Section Name</Label>

                    <Input defaultValue={"Section A"} className="w-96" />
                </VStack>
                <VStack>
                    {" "}
                    <Label>No. of Batches</Label>
                    <Input defaultValue={"3"} className="w-96" />
                </VStack>
                <Button size={"lg"}>Save details</Button>
            </VStack>
            <hr className="my-5 w-full"></hr>
            <VStack className="w-full gap-8">
                <VStack>
                    <span className="text-lg font-semibold text-red-500">
                        Delete Section A
                    </span>
                    <p className="w-2/3 text-muted-foreground">
                        Deleting <b> Section A </b>branch will permanently erase all data included in
                        this section and this action is   {" "}
                        <span className="text-red-500">permanent and irreversible.</span>
                    </p>
                </VStack>
                <Button size={"lg"} variant={"destructive_outline"}>
                    Delete Section A
                </Button>
            </VStack>
        </div>
    );
}