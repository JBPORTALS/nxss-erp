import React from 'react'

import { Avatar, AvatarFallback, AvatarImage } from "@nxss/ui/avatar";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@nxss/ui/card";
import { HStack, VStack } from "@nxss/ui/stack";
export function AttendanceCard() {
  return (
    <Card className="w-full">
    <CardHeader className="flex flex-row items-center gap-3 p-4">
      <Avatar className="h-12 w-12">
        <AvatarImage src="https://github.com/shadcn.png" alt="Rayn Reynolds" />
        <AvatarFallback>RR</AvatarFallback>
      </Avatar>
      <VStack className="gap-0">
        <span className="font-semibold">Rayn Reynolds</span>
        <p className="text-sm text-muted-foreground">364CS18923</p>
      </VStack>
    </CardHeader>
    <CardContent className="p-4">
      <div className="grid grid-cols-3 gap-4 text-center">
        <VStack className="w-full text-center items-center">
          <span className="text-sm ">Total Sessions</span>
          <p className="text-xl font-semibold ">60</p>
        </VStack>
        <VStack className="w-full text-center items-center">
          <span className="text-sm ">Attended</span>
          <p className="text-xl font-semibold">30</p>
        </VStack>           
        <VStack className="w-full text-center items-center">
          <span className="text-sm ">Percentage</span>
          <p className="text-xl font-semibold">50%</p>
        </VStack>
      </div>
    </CardContent>
    <CardFooter className="p-4">
      <p className="text-sm text-muted-foreground">
        30 sessions has been not attended
      </p>
    </CardFooter>
  </Card>
  )
}
