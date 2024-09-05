"use client";

import React, { useCallback, useMemo, useState } from "react";
import { format, startOfMonth } from "date-fns";
import {
  CalendarIcon,
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
import { Event, Scheduler, ToolbarProps, View } from "@nxss/ui/schedular";
import { Separator } from "@nxss/ui/seperator";
import { Tabs, TabsList, TabsTrigger } from "@nxss/ui/tabs";
import { Textarea } from "@nxss/ui/textarea";

import { api } from "~/trpc/react";

const types = [
  { label: "Event", value: "event" },
  { label: "Holiday", value: "holiday" },
  { label: "Opportunity", value: "opportunity" },
];

const addEventSchema = z.object({
  title: z.string().min(1, "Required"),
  description: z.string().optional(),
  datetime: z.object({
    from: z.date({
      required_error: "A date of birth is required.",
    }),
    to: z.date({}).optional(),
  }),
  location: z.string().optional(),
});

type FilterType = "event" | "holiday" | "opportunity";

const ScheduleContext = React.createContext<{
  date: Date;
  view: View;
  onView: (view: View) => void;
  onDate: (newDate: Date) => void;
  typeFilter: FilterType[];
  setTypeFilter: React.Dispatch<React.SetStateAction<FilterType[]>>;
}>({
  date: new Date(),
  view: "month",
  typeFilter: [],
  onView: () => {},
  onDate: () => {},
  setTypeFilter: () => {},
});

function ScheduleContextProvider({ children }: { children: React.ReactNode }) {
  const [view, setView] = useState<View>("month");
  const [date, setDate] = useState<Date>(new Date());
  const [typeFilter, setTypeFilter] = useState<FilterType[]>([]);

  const contextValue = useMemo(
    () => ({
      typeFilter,
      view,
      date,
      onView: setView,
      onDate: setDate,
      setTypeFilter,
    }),
    [typeFilter, view, date],
  );

  return (
    <ScheduleContext.Provider value={contextValue}>
      {children}
    </ScheduleContext.Provider>
  );
}

function AddEventDialog({ children }: { children: React.ReactNode }) {
  const form = useForm({
    schema: addEventSchema,
    mode: "onChange",
    defaultValues: {
      datetime: {
        from: new Date(),
        to: new Date(),
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
                        <Input
                          type="time"
                          onChange={(e) => console.log(e.target.value)}
                        />
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

function CalendarToolBar(props: ToolbarProps<Event, { title: string }>) {
  const { onDate, onView, date, view, typeFilter, setTypeFilter } =
    React.useContext(ScheduleContext);

  const localTypeFilter = useMemo(
    () => ({
      event: typeFilter.includes("event"),
      holiday: typeFilter.includes("holiday"),
      opportunity: typeFilter.includes("opportunity"),
    }),
    [typeFilter],
  );

  const totalFilterApplied = typeFilter.length;

  const handleTypeFilterChange = useCallback(
    (type: FilterType) => {
      setTypeFilter((prev) =>
        prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type],
      );
    },
    [setTypeFilter],
  );

  const clearFilters = useCallback(() => {
    setTypeFilter([]);
  }, [setTypeFilter]);

  return (
    <div className="flex gap-2 pb-4">
      {/**Select Date Range */}
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
            defaultMonth={date}
            onSelect={(newDate) => onDate(newDate ?? new Date())}
          />
        </PopoverContent>
      </Popover>

      {/**Select View */}
      <Tabs className="w-3/12">
        <TabsList>
          {(props.views as View[]).map((viewItem) => (
            <TabsTrigger
              isActive={view === viewItem}
              onClick={() => {
                onView(viewItem);
              }}
              key={viewItem}
              value={viewItem}
              className="capitalize"
            >
              {viewItem}
            </TabsTrigger>
          ))}
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
            {totalFilterApplied > 0 && (
              <div className="flex gap-1">
                <Separator orientation="vertical" />
                <Badge
                  variant={"secondary"}
                  className="rounded-md font-light capitalize"
                >
                  {totalFilterApplied} Applied
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
                    onSelect={() =>
                      handleTypeFilterChange(type.value as FilterType)
                    }
                    className="h-8 gap-1 text-sm"
                  >
                    <Checkbox
                      className="size-4 rounded-md"
                      checked={localTypeFilter[type.value as FilterType]}
                    />
                    <DotIcon
                      className={cn(
                        "size-8",
                        type.value === "event" && "text-indigo-600",
                        type.value === "opportunity" && "text-purple-600",
                        type.value === "holiday" && "text-green-700",
                      )}
                    />
                    {type.label}
                    <span className="ml-auto font-mono text-muted-foreground">
                      10
                    </span>
                  </CommandItem>
                ))}
              </CommandGroup>
              {totalFilterApplied > 0 && (
                <>
                  <CommandSeparator />
                  <CommandGroup>
                    <Button
                      onClick={clearFilters}
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

function SchedulerWithContext() {
  const { date, view, typeFilter } = React.useContext(ScheduleContext);

  console.log(typeFilter);

  const { data, isLoading } = api.calendar.getEventList.useQuery(
    {
      date,
      typeFilter,
    },
    {
      queryHash: `${startOfMonth(date).getMonth()}-${startOfMonth(date).getFullYear()}-${typeFilter.join("-")}`,
    },
  );

  const events = useMemo(
    () =>
      data?.map((event) => ({
        id: event.id,
        title: event.title,
        description: event.description,
        start: event.start_date,
        end: event.end_date ?? event.start_date,
        allDay: event.is_all_day,
        type: event.event_type,
      })),
    [data],
  );

  return (
    <Scheduler
      events={events ?? []}
      date={date}
      view={view}
      components={{
        toolbar: (props) => <CalendarToolBar {...props} />,
      }}
      className="h-[900px]"
      views={["week", "month"]}
    />
  );
}

export default function page() {
  return (
    <ScheduleContextProvider>
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
        <SchedulerWithContext />
      </div>
    </ScheduleContextProvider>
  );
}
