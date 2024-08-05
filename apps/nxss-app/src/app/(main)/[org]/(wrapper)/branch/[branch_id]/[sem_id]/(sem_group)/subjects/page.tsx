import React from "react";
import { Ellipsis } from "lucide-react";

import { AvatarList } from "@nxss/ui/avatar-list";
import { Button } from "@nxss/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@nxss/ui/card";
import { Input } from "@nxss/ui/input";
import { HStack, VStack } from "@nxss/ui/stack";

export default function Subjects() {
  return (
    <VStack className="h-full w-full gap-8">
      <HStack className="w-full items-center justify-between">
        <Input placeholder="Search..." className="w-2/3" />
        <Button>Add Subject</Button>
      </HStack>
      <div className="grid w-full grid-cols-3 gap-5">
        
        <Card className="h-full w-full">
          <CardHeader className="">
            <CardTitle className="flex gap-4">
              <div className="size-6 rounded-full bg-blue-400"></div>{" "}
              Fundamentals of computers
            </CardTitle>
          </CardHeader>
          <CardContent className="flex w-full">
            <span className="text-muted-foreground">
              Fundamentals of computers cover the core principles and essential
              components of digital technology and computing systems.
            </span>
          </CardContent>
          <CardFooter className="flex w-full items-center justify-between border-t py-4 ">
            <AvatarList
              images={[
                "https://avatars2.githubusercontent.com/u/263385",
                "https://avatars2.githubusercontent.com/u/132554",
                "https://avatars2.githubusercontent.com/u/263385",
                "https://avatars2.githubusercontent.com/u/132554",
              ]}
              maxAvatars={3}
              size="medium"
            />
            <Ellipsis className="text-muted-foreground" />
          </CardFooter>
        </Card>
      </div>
    </VStack>
  );
}
