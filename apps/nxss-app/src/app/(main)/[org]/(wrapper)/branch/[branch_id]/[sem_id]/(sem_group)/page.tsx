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
import { HStack } from "@nxss/ui/stack";

export default function Page() {
  return (
    <div className="grid w-full grid-cols-4 gap-5">
      <Card x-chunk="dashboard-05-chunk-2 " className="w-full">
        <CardHeader className="pb-2">
          <CardDescription>Attendence</CardDescription>
          <CardTitle className="text-4xl">68%</CardTitle>
        </CardHeader>
        <CardContent></CardContent>
        <CardFooter>
          <Progress value={68} />
        </CardFooter>
      </Card>
      <Card x-chunk="dashboard-05-chunk-2 " className="w-full">
        <CardHeader className="pb-2">
          <CardTitle className="text-2xl">Total no. of Staff</CardTitle>
          <CardDescription>Active staff members</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-4xl font-semibold">50</div>
        </CardContent>
      </Card>
      <Card x-chunk="dashboard-05-chunk-2 " className="w-full">
        <CardHeader className="pb-2">
          <CardTitle className="text-2xl">Total no. of Students</CardTitle>
          <CardDescription>Total active Students</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-4xl font-semibold">15000</div>
        </CardContent>
      </Card>
    </div>
  );
}
