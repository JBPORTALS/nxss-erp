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
      <Card x-chunk="dashboard-05-chunk-2 " className="w-full">
        <CardHeader className="pb-2">
          <CardDescription>Total no. of Staff</CardDescription>
          <CardTitle className="text-4xl">50</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-xs text-muted-foreground">
            Active staff members
          </div>
        </CardContent>
      </Card>
      <Card x-chunk="dashboard-05-chunk-2 " className="w-full">
        <CardHeader className="pb-2">
          <CardDescription>Total no. of Students</CardDescription>
          <CardTitle className="text-4xl">15000</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-xs text-muted-foreground">
            Total active Students
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
