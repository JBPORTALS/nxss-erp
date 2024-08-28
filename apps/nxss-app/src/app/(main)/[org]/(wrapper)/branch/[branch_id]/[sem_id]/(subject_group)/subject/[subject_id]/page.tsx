import React from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@nxss/ui/card";
import { Progress } from "@nxss/ui/progress";
import { VStack } from "@nxss/ui/stack";

export default function page() {
  return (
    <div className="w-full">
      {" "}
      <VStack className="gap-2">
        <h1 className="text-2xl font-bold">Overview</h1>
        <span className="text-muted-foreground">
          A Comprehensive Guide for a Fundamentals of computers
        </span>
      </VStack>
      <hr className="my-5 w-full"></hr>
      <VStack className="grid grid-cols-4">
        <Card x-chunk="dashboard-05-chunk-2 " className="w-full">
          <CardHeader className="pb-2">
            <CardDescription>Attendance</CardDescription>
            <CardTitle className="text-4xl">68%</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground">
              Overall semester attendance.
            </div>
          </CardContent>
          <CardFooter>
            <Progress value={68} />
          </CardFooter>
        </Card>
      </VStack>
    </div>
  );
}
