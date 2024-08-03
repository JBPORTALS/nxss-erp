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

export default function Page() {
  return (
    <div className="w-full">
      <Card x-chunk="dashboard-05-chunk-2 " className="w-1/4">
        <CardHeader className="pb-2">
          <CardDescription>Attendance</CardDescription>
          <CardTitle className="text-4xl">68%</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-xs text-muted-foreground">
            Overall academic year attendance.
          </div>
        </CardContent>
        <CardFooter>
          <Progress value={68} />
        </CardFooter>
      </Card>
    </div>
  );
}
