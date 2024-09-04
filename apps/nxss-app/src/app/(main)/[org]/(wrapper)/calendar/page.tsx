"use client";

import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@nxss/ui/button";
import { HeaderProps, Scheduler } from "@nxss/ui/schedular";
import { Separator } from "@nxss/ui/seperator";

function CalendarToolBar(props: HeaderProps) {
  return (
    <div className="flex">
      <Button size={"icon"}>
        <ChevronLeft />
      </Button>
      <Button size={"icon"}>
        <ChevronRight />
      </Button>
    </div>
  );
}

export default function page() {
  return (
    <div className="h-full w-full space-y-4">
      <div className="space-y-2">
        <h4 className="text-2xl font-semibold leading-8 tracking-[-0.2.5%]">
          Calendar
        </h4>
        <p className="text-sm leading-5 text-muted-foreground">
          Manage and Schedule Events, Holidays, and Opportunities Across All
          Academic Levels
        </p>
      </div>
      <Separator />
      <Scheduler
        toolbar
        popup
        defaultDate={new Date(2024, 5, 6)}
        className="h-[850px]"
      />
    </div>
  );
}
