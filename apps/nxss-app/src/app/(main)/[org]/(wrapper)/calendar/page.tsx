"use client";

import React, { useState } from "react";
import { format } from "date-fns";
import {
  CalendarIcon,
  ChevronLeft,
  ChevronRight,
  CirclePlusIcon,
  DotIcon,
  PlusCircle,
  Square,
} from "lucide-react";
import { z } from "zod";

import { cn } from "@nxss/ui";
import { Badge } from "@nxss/ui/badge";
import { Button } from "@nxss/ui/button";
import { Calendar } from "@nxss/ui/calendar";
import { Checkbox } from "@nxss/ui/checkbox";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@nxss/ui/command";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@nxss/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  useForm,
} from "@nxss/ui/form";
import { Input } from "@nxss/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@nxss/ui/popover";
import {
  Event,
  HeaderProps,
  Scheduler,
  ToolbarProps,
} from "@nxss/ui/schedular";
import { Separator } from "@nxss/ui/seperator";
import { Tabs, TabsList, TabsTrigger } from "@nxss/ui/tabs";
import { Textarea } from "@nxss/ui/textarea";

const types = [
  { label: "Event", value: "event", color: "blue" },
  { label: "Holiday", value: "holiday", color: "darkgreen" },
  { label: "Opportunity", value: "opportunity", color: "purple" },
];

const addEventSchema = z.object({
  title: z.string().min(1, "Required"),
  description: z.string().optional(),
  datetime: z.object({
    from: z.date({
      required_error: "A date of birth is required.",
    }),
    to: z.date({}).optional(),
    fromTime: z.string().min(1),
    toTime: z.string().min(1, "required"),
  }),
  location: z.string().optional(),
});

function AddEventDialog({ children }: { children: React.ReactNode }) {
  const form = useForm({
    schema: addEventSchema,
    mode: "onChange",
    defaultValues: {
      datetime: {
        from: new Date(),
        to: new Date(),
        toTime: new Date().getTime().toString(),
        fromTime: new Date().getTime().toString(),
      },
    },
  });
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="w-[450px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Square className="size-4 rounded-sm bg-indigo-600 text-indigo-600" />
            Create New Event
          </DialogTitle>
          <DialogDescription>
            Enter the details for the event to be scheduled
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="datetime"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Date & Time</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground",
                          )}
                        >
                          {field.value?.from ? (
                            field.value?.to ? (
                              <>
                                {format(field.value?.from, "LLL dd, y")} -{" "}
                                {format(field.value?.to, "LLL dd, y")}
                              </>
                            ) : (
                              format(field.value?.from, "LLL dd, y")
                            )
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <div className="flex justify-between gap-4 p-2">
                        <Input type="time" />
                        <Input type="time" />
                      </div>
                      <Calendar
                        mode="range"
                        defaultMonth={field.value?.from}
                        numberOfMonths={2}
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date < new Date() || date < new Date("1900-01-01")
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{"Description (optional)"}</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{"Location (optional)"}</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className="justify-end">
              <Button size={"lg"}>Save</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

function CalendarToolBar(props: ToolbarProps) {
  const [date, setDate] = useState<Date>(new Date(Date.now()));
  const [typefilter, setTypeFilter] = useState({
    event: false,
    holiday: false,
    opportunity: false,
  });
  const totalIFilterApplied = Object.values(typefilter).filter(
    (value) => value === true,
  ).length;

  //call procedures over here

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
            initialFocus
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
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            className="border-dashed border-input"
          >
            <CirclePlusIcon className="size-4" />
            Type
            {totalIFilterApplied > 0 && (
              <div className="flex gap-1">
                <Separator orientation="vertical" />

                <Badge
                  variant={"secondary"}
                  className="rounded-md font-light capitalize"
                >
                  {totalIFilterApplied} Applied
                </Badge>
              </div>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent align="start" className="w-[200px] p-0">
          <Command>
            <CommandInput placeholder="Search type..." className="h-9" />
            <CommandList>
              <CommandEmpty>No type found.</CommandEmpty>
              <CommandGroup>
                {types.map((type) => (
                  <CommandItem
                    value={type.label}
                    key={type.value}
                    onSelect={() => {
                      setTypeFilter((prev) => ({
                        ...prev,
                        [type.value as "event" | "opportunity" | "holiday"]:
                          !typefilter[
                            type.value as "event" | "opportunity" | "holiday"
                          ],
                      }));
                    }}
                    className="h-8 gap-1 text-sm"
                  >
                    <Checkbox
                      className="size-4 rounded-md"
                      checked={
                        typefilter[
                          type.value as "event" | "opportunity" | "holiday"
                        ]
                      }
                    />
                    <DotIcon color={type.color} className="size-8" />
                    {type.label}
                    <span className="ml-auto font-mono text-muted-foreground">
                      10
                    </span>
                  </CommandItem>
                ))}
              </CommandGroup>
              {Object.values(typefilter).includes(true) && (
                <>
                  <CommandSeparator />
                  <CommandGroup>
                    <Button
                      onClick={() =>
                        setTypeFilter({
                          event: false,
                          holiday: false,
                          opportunity: false,
                        })
                      }
                      className="w-full"
                      size={"sm"}
                      variant={"ghost"}
                    >
                      Clear Filters
                    </Button>
                  </CommandGroup>
                </>
              )}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}

export default function page() {
  const [events] = React.useState<Event[]>([
    {
      title: "Ethnic day",
      start: new Date(2024, 5, 4, 9, 0),
      end: new Date(2024, 5, 4, 12, 30),
      allDay: true,
    },
    {
      title: "Picknic day",
      start: new Date(2024, 5, 4),
      end: new Date(2024, 5, 4),
    },
    {
      title: "Panic day",
      start: new Date(2024, 5, 4),
      end: new Date(2024, 5, 4),
    },
    {
      title: "Rose day",
      start: new Date(2024, 5, 4),
      end: new Date(2024, 5, 4),
    },
    {
      title: "Flower day",
      start: new Date(2024, 5, 4),
      end: new Date(2024, 5, 4),
    },
    {
      title: "Bakrid",
      start: new Date(2024, 5, 11),
      end: new Date(2024, 5, 11),
    },
    {
      title: "Seminars",
      start: new Date(2024, 5, 18),
      end: new Date(2024, 5, 18),
    },
    {
      title: "UGC Exam",
      start: new Date(2024, 5, 25, 9, 0),
      end: new Date(2024, 5, 25, 12, 0),
    },
  ]);
  return (
    <div className="h-full w-full space-y-4">
      <div className="flex justify-between">
        <div className="space-y-2">
          <h4 className="text-2xl font-semibold leading-8 tracking-[-0.2.5%]">
            Calendar
          </h4>
          <p className="text-sm leading-5 text-muted-foreground">
            Manage and Schedule Events, Holidays, and Opportunities Across All
            Academic Levels
          </p>
        </div>
        <Popover>
          <PopoverTrigger asChild>
            <Button>
              Create <PlusCircle className="size-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-1" align="end">
            <AddEventDialog>
              <Button className="w-full justify-start" variant={"ghost"}>
                <Square className="size-2 rounded-sm bg-indigo-600 text-indigo-600" />{" "}
                Event
              </Button>
            </AddEventDialog>
            <Button className="w-full justify-start" variant={"ghost"}>
              <Square className="size-2 rounded-sm bg-green-800 text-green-800" />
              Holiday
            </Button>
            <Button className="w-full justify-start" variant={"ghost"}>
              <Square className="size-2 rounded-sm bg-purple-600 text-purple-600" />
              Opportunity
            </Button>
          </PopoverContent>
        </Popover>
      </div>
      <Separator />
      <Scheduler
        events={events}
        defaultView={"month"}
        toolbar
        popup
        components={{
          toolbar: CalendarToolBar,
          event: (props) => {
            return <div>{props.title}</div>;
          },
        }}
        defaultDate={new Date(2024, 5, 6)}
        className="h-[950px]"
      />
    </div>
  );
}
