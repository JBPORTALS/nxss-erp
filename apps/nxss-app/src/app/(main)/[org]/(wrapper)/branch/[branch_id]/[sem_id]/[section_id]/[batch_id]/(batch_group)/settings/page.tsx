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


                    <Label>Batch Name</Label>

                    <Input defaultValue={"Batch 1"} className="w-96" />
                </VStack>
                <VStack>
                    {" "}
                    <Label>Description</Label>
                    <Textarea defaultValue={"Facilities and Tools for Sections"} className="w-96 " rows={4}/>
                </VStack>
                <Button size={"lg"}>Save details</Button>
            </VStack>
            <hr className="my-5 w-full"></hr>
            <VStack className="w-full gap-8">
                <VStack>
                    <span className="text-lg font-semibold text-red-500">
                        Delete Batch 1
                    </span>
                    <p className="w-2/3 text-muted-foreground">
                        Deleting <b> Batch 1 </b>branch will permanently erase all data included in
                        this batch and this action is   {" "}
                        <span className="text-red-500">permanent and irreversible.</span>
                    </p>
                </VStack>
                <Button size={"lg"} variant={"destructive_outline"}>
                    Delete Batch 1
                </Button>
            </VStack>
        </div>
    );
}