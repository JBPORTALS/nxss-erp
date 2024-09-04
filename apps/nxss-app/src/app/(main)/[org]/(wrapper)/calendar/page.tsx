"use client";

import React, { useState } from "react";
import { format } from "date-fns";
import {
  CalendarIcon,
  ChevronLeft,
  ChevronRight,
  CirclePlusIcon,
} from "lucide-react";

import { cn } from "@nxss/ui";
import { Button } from "@nxss/ui/button";
import { Calendar } from "@nxss/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@nxss/ui/popover";
import { HeaderProps, Scheduler, ToolbarProps } from "@nxss/ui/schedular";
import { Separator } from "@nxss/ui/seperator";
import { Tabs, TabsList, TabsTrigger } from "@nxss/ui/tabs";

function CalendarToolBar(props: ToolbarProps) {
  const [date, setDate] = useState<Date>(new Date(Date.now()));
  return (
    <div className="flex gap-2 pb-4">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-[240px] justify-start text-left font-normal",
              !date && "text-muted-foreground",
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, "PPP") : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            onSelect={(date) => setDate(date ?? new Date())}
            autoFocus
          />
        </PopoverContent>
      </Popover>
      <Tabs className="w-3/12">
        <TabsList>
          <TabsTrigger
            isActive={props.view === "day"}
            onClick={() => props.onView("day")}
            value="day"
          >
            Day
          </TabsTrigger>
          <TabsTrigger
            isActive={props.view === "week"}
            onClick={() => props.onView("week")}
            value="week"
          >
            Week
          </TabsTrigger>
          <TabsTrigger
            isActive={props.view === "month"}
            onClick={() => props.onView("month")}
            value="month"
          >
            Month
          </TabsTrigger>
        </TabsList>
      </Tabs>
      <Button variant={"outline"} className="border-dashed border-input">
        <CirclePlusIcon className="size-4" />
        Type
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
        defaultView={"month"}
        toolbar
        popup
        components={{
          toolbar: CalendarToolBar,
        }}
        defaultDate={new Date(2024, 5, 6)}
        className="h-[950px]"
      />
    </div>
  );
}
