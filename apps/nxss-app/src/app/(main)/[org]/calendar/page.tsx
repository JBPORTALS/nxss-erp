"use client";

import React, { useCallback, useMemo, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Protect, useAuth } from "@clerk/nextjs";
import { addDays, format, set, startOfMonth, subDays } from "date-fns";
import {
  ArrowRight,
  CalendarDays,
  CalendarIcon,
  CirclePlusIcon,
  DotIcon,
  Edit,
  GraduationCap,
  PinIcon,
  PlusCircle,
  Square,
  Text,
  TrashIcon,
  User,
  User2Icon,
  Users2Icon,
} from "lucide-react";
import { z } from "zod";

import { RouterInputs } from "@nxss/api";
import { cn } from "@nxss/ui";
import { Badge } from "@nxss/ui/badge";
import { Button, buttonVariants } from "@nxss/ui/button";
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
  ContentArea,
  ContentAreaContainer,
  ContentAreaDescription,
  ContentAreaHeader,
  ContentAreaTitle,
} from "@nxss/ui/content-area";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
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
  CustomEvent,
  Event,
  Scheduler,
  ToolbarProps,
  View,
} from "@nxss/ui/schedular";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@nxss/ui/select";
import { Separator } from "@nxss/ui/seperator";
import { Switch } from "@nxss/ui/switch";
import { Tabs, TabsList, TabsTrigger } from "@nxss/ui/tabs";
import { Textarea } from "@nxss/ui/textarea";
import { toast } from "@nxss/ui/toast";
import { eventSchema } from "@nxss/validators";

import { ScopeSelect } from "~/app/_components/select/scope-select";
import { api } from "~/trpc/react";

const types = [
  { label: "Event", value: "event" },
  { label: "Holiday", value: "holiday" },
  { label: "Opportunity", value: "opportunity" },
];

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

function AddEventDialog({
  children,
  eventType,
}: {
  children: React.ReactNode;
  eventType: RouterInputs["calendar"]["createEvent"]["event_type"];
}) {
  const utils = api.useUtils();
  const [open, setOpen] = useState(false);

  const { mutateAsync } = api.calendar.createEvent.useMutation({
    onSuccess() {
      utils.calendar.invalidate();
      toast.success(
        `${eventType.charAt(0).toUpperCase() + eventType.slice(1).toLowerCase()} created successfully`,
      );
      setOpen(false);
    },
  });
  const form = useForm({
    schema: eventSchema,
    mode: "all",
    reValidateMode: "onChange",
    defaultValues: {
      datetime: {
        from: new Date(Date.now()),
        to: addDays(new Date(Date.now()), 1),
      },
      includeTime: false,
      audienceType: "all",
    },
  });

  async function onSubmit(values: z.infer<typeof eventSchema>) {
    const branch = values?.scope?.at(0);
    const semester = values?.scope?.at(1);
    const section = values?.scope?.at(2);
    const batch = values?.scope?.at(3);

    await mutateAsync({
      start_date: values?.datetime?.from ?? new Date(),
      end_date: values?.datetime?.to,
      is_all_day: !values.includeTime,
      title: values.title,
      description: values.description,
      audience_type: values.audienceType,
      event_type: eventType,
      location: values.location,
      scope:
        values.audienceType !== "all"
          ? {
              branchId: branch?.value ? parseInt(branch?.value) : undefined,
              semesterId: semester?.value
                ? parseInt(semester.value)
                : undefined,
              sectionId: section?.value ? parseInt(section.value) : undefined,
              batchId: batch?.value ? parseInt(batch.value) : undefined,
            }
          : undefined,
    });
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent onClick={(e) => e.stopPropagation()} className="w-[540px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Square
              className={cn(
                "size-4 rounded-sm",
                eventType === "event" && "bg-indigo-600 text-indigo-600",
                eventType === "holiday" && "bg-green-600 text-green-600",
                eventType === "opportunity" && "bg-purple-600 text-purple-600",
              )}
            />
            Create New <span className="capitalize">{eventType}</span>
          </DialogTitle>
          <DialogDescription>
            Enter the details for the{" "}
            <span className="capitalize">{eventType}</span> to be scheduled
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      placeholder="Description (optional) ..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {eventType !== "holiday" && (
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        placeholder="Location (optional)..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

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
                            "h-10 w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground",
                          )}
                        >
                          {field.value?.from ? (
                            field.value?.to ? (
                              <>
                                {format(
                                  field.value?.from,
                                  form.getValues().includeTime
                                    ? "LLL dd, y hh:mm a"
                                    : "LLL dd, y",
                                )}{" "}
                                <ArrowRight className="size-3 text-muted-foreground" />{" "}
                                {format(
                                  field.value?.to,
                                  form.getValues().includeTime
                                    ? "LLL dd, y hh:mm a"
                                    : "LLL dd, y",
                                )}
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
                    <PopoverContent
                      sideOffset={-130}
                      className="w-[250px] items-center justify-center p-0"
                      align="center"
                    >
                      <div className="flex w-full flex-col gap-2 p-2">
                        <div
                          className={
                            "flex h-9 w-full items-center justify-between gap-2 rounded-md border border-input p-2"
                          }
                        >
                          <input
                            value={
                              field.value?.from
                                ? format(field.value?.from, "LLL dd, y")
                                : "Empty"
                            }
                            readOnly
                            disabled
                            className="w-full flex-1 bg-transparent text-sm outline-none"
                          />
                          {form.getValues().includeTime && (
                            <FormField
                              control={form.control}
                              name="datetime.from"
                              render={({ field: fromTimeField }) => (
                                <>
                                  <Separator orientation="vertical" />
                                  <FormControl>
                                    <input
                                      {...fromTimeField}
                                      value={
                                        fromTimeField.value
                                          ? format(fromTimeField.value, "HH:mm")
                                          : "00:00"
                                      }
                                      onChange={(e) => {
                                        const [hours, minutes] = e.target.value
                                          .split(":")
                                          .map(Number);

                                        if (field?.value?.from)
                                          form.setValue(
                                            "datetime.from",
                                            set(field.value.from, {
                                              hours,
                                              minutes,
                                            }),
                                          );
                                      }}
                                      type="time"
                                      className="border-none bg-transparent text-sm outline-none"
                                    />
                                  </FormControl>
                                </>
                              )}
                            />
                          )}
                        </div>

                        <div
                          className={
                            "flex h-9 w-full items-center justify-between gap-2 rounded-md border border-input p-2"
                          }
                        >
                          <input
                            value={
                              field.value?.to
                                ? format(field.value?.to, "LLL dd, y")
                                : "Empty"
                            }
                            readOnly
                            disabled
                            className="w-full flex-1 bg-transparent text-sm outline-none"
                          />
                          {form.getValues().includeTime && (
                            <FormField
                              control={form.control}
                              name="datetime.to"
                              render={({ field: toTimeField }) => (
                                <>
                                  <Separator orientation="vertical" />
                                  <FormControl>
                                    <input
                                      {...toTimeField}
                                      value={
                                        toTimeField.value
                                          ? format(toTimeField.value, "HH:mm")
                                          : "00:00"
                                      }
                                      onChange={(e) => {
                                        const [hours, minutes] = e.target.value
                                          .split(":")
                                          .map(Number);

                                        if (field?.value?.to)
                                          form.setValue(
                                            "datetime.to",
                                            set(field.value.to, {
                                              hours,
                                              minutes,
                                            }),
                                          );
                                      }}
                                      type="time"
                                      className="border-none bg-transparent text-sm outline-none"
                                    />
                                  </FormControl>
                                </>
                              )}
                            />
                          )}
                        </div>
                      </div>
                      <Calendar
                        mode="range"
                        defaultMonth={field.value?.to}
                        numberOfMonths={1}
                        selected={field.value}
                        onSelect={(range) => {
                          form.setValue("datetime", range);
                        }}
                        disabled={(date) => date < subDays(new Date(), 1)}
                        initialFocus
                        className="w-full"
                        footer={
                          <>
                            <Separator />
                            <div className="mt-2 w-full gap-1">
                              {/* <Button
                          variant={"ghost"}
                          className="w-full justify-between"
                          >
                          End Date <Switch />
                        </Button> */}
                              <FormField
                                name="includeTime"
                                control={form.control}
                                render={({ field }) => (
                                  <div
                                    className={cn(
                                      buttonVariants({ variant: "ghost" }),
                                      "w-full justify-between",
                                    )}
                                  >
                                    Include Time{" "}
                                    <FormControl>
                                      <Switch
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                      />
                                    </FormControl>
                                  </div>
                                )}
                              />
                            </div>
                          </>
                        }
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* <pre>
              {JSON.stringify(form.getFieldState("scope"), undefined, 2)}
            </pre> */}

            <FormField
              control={form.control}
              name="audienceType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{"Audience"}</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select ..." />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="all">
                        <div className="flex items-center gap-2">
                          <Users2Icon className="size-4" /> All
                        </div>
                      </SelectItem>
                      <SelectItem
                        className="flex items-center gap-2"
                        value="students"
                      >
                        <div className="flex items-center gap-1">
                          <GraduationCap className="size-4" /> Students
                        </div>
                      </SelectItem>
                      <SelectItem
                        className="flex items-center gap-2"
                        value="staff"
                      >
                        <div className="flex items-center gap-1">
                          <User2Icon className="size-4" />
                          Staff
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {form.getValues().audienceType !== "all" && (
              <FormField
                control={form.control}
                name="scope"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{"Scope for students"}</FormLabel>
                    <FormControl>
                      <ScopeSelect values={field.value ?? []} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <DialogFooter className="justify-end">
              <Button
                isLoading={form.formState.isSubmitting}
                type="submit"
                size={"lg"}
              >
                Save
              </Button>
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
  const { orgRole } = useAuth();

  console.log(orgRole);

  const { data, isLoading } = api.calendar.getEventList.useQuery(
    {
      date,
      typeFilter,
      audienceType: orgRole == "org:staff" ? "staff" : undefined,
    },
    {
      queryHash: `${startOfMonth(date).getMonth()}-${startOfMonth(date).getFullYear()}-${typeFilter.join("-")}`,
      enabled: !!orgRole,
    },
  );

  const events = useMemo(
    () =>
      data?.map((event) => ({
        id: event.id,
        title: event.title,
        description: event.description,
        start: event.start_date,
        end: event.end_date ? event.end_date : event.start_date,
        allDay: event.is_all_day,
        type: event.event_type,
        location: event.location,
        audienceType: event.audience_type,
      })),
    [data],
  );

  type Event = Exclude<typeof events, undefined>[number];

  const EventWrapper: React.ComponentType<{
    event: CustomEvent & Event;
    children: React.ReactNode;
  }> = ({ event, children }) => {
    const utils = api.useUtils();
    const { mutateAsync: deleteEventMutate, isPending: isDeleting } =
      api.calendar.deleteEvent.useMutation({
        onSuccess: () => {
          utils.calendar.invalidate();
          toast.info(`Event deleted successfully`);
        },
      });

    const pathname = usePathname();
    const router = useRouter();
    return (
      <Popover>
        <PopoverTrigger asChild>{children}</PopoverTrigger>
        <PopoverContent className="w-96" align="start">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Square
                className={cn(
                  "size-5 rounded-sm",
                  event.type === "event" && "bg-indigo-600 text-indigo-600",
                  event.type === "holiday" && "bg-green-600 text-green-600",
                  event.type === "opportunity" &&
                    "bg-purple-600 text-purple-600",
                )}
              />
              <Protect role="org:admin">
                <div className="flex items-center justify-end gap-1">
                  <Button
                    onClick={() => router.push(`${pathname}/v/${event.id}`)}
                    size={"icon"}
                    variant={"ghost"}
                    className="size-11 rounded-full"
                  >
                    <Edit className="size-5" />
                  </Button>
                  <Button
                    isLoading={isDeleting}
                    onClick={() => deleteEventMutate({ id: event.id })}
                    size={"icon"}
                    variant={"ghost"}
                    className="size-11 rounded-full text-destructive hover:text-destructive"
                  >
                    {!isDeleting && <TrashIcon className="size-4" />}
                  </Button>
                </div>
              </Protect>
            </div>
            <h3 className="text-xl font-medium">{event?.title}</h3>
            <div className="flex w-full items-center gap-2">
              <CalendarDays className="size-5 text-muted-foreground" />
              <span className="flex items-center gap-1 text-xs">
                {format(
                  event.start,
                  !event.allDay ? "LLL dd, y hh:mm a" : "LLL dd, y",
                )}{" "}
                <ArrowRight className="size-3 text-muted-foreground" />{" "}
                {format(
                  event.end,
                  !event.allDay ? "LLL dd, y hh:mm a" : "LLL dd, y",
                )}
              </span>
            </div>
            <div className="flex w-full gap-2">
              <Text className="size-5 text-muted-foreground" />
              <p className="w-3/4 text-xs">
                {event.description ?? "No description ..."}
              </p>
            </div>
            <div className="flex w-full gap-2">
              <User className="size-5 text-muted-foreground" />
              <p className="w-3/4 text-xs capitalize">{event.audienceType}</p>
            </div>
            <div className="flex w-full gap-2">
              <PinIcon className="size-5 text-muted-foreground" />
              <p className="w-3/4 text-xs">
                {event.location ?? "No location details..."}
              </p>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    );
  };

  return (
    <Scheduler
      events={events ?? []}
      date={date}
      view={view}
      showMultiDayTimes
      components={{
        toolbar: (props) => <CalendarToolBar {...props} />,
      }}
      //@ts-ignore
      PopoverComponent={EventWrapper}
      timeslots={5}
      className={cn("h-[900px]", isLoading && "animate-pulse")}
      views={["week", "month"]}
      onSelectSlot={(slotinfo) => console.log("slot", slotinfo)}
      onSelectEvent={(e) => console.log("select ", e)}
      popup
    />
  );
}

export default function page() {
  return (
    <ScheduleContextProvider>
      <ContentArea>
        <ContentAreaHeader className="flex-row justify-between">
          <div className="space-y-2">
            <ContentAreaTitle className="text-2xl font-semibold leading-8 tracking-[-0.2.5%]">
              Calendar
            </ContentAreaTitle>
            <ContentAreaDescription className="text-sm leading-5 text-muted-foreground">
              Manage and Schedule Events, Holidays, and Opportunities Across All
              Academic Levels
            </ContentAreaDescription>
          </div>
          <Protect role="org:admin">
            <Popover>
              <PopoverTrigger asChild>
                <Button>
                  Create <PlusCircle className="size-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent
                onClick={(e) => e.preventDefault()}
                className="w-[200px] p-1"
                align="end"
              >
                <AddEventDialog eventType="event">
                  <Button className="w-full justify-start" variant={"ghost"}>
                    <Square className="size-2 rounded-sm bg-indigo-600 text-indigo-600" />{" "}
                    Event
                  </Button>
                </AddEventDialog>
                <AddEventDialog eventType="holiday">
                  <Button className="w-full justify-start" variant={"ghost"}>
                    <Square className="size-2 rounded-sm bg-green-800 text-green-800" />
                    Holiday
                  </Button>
                </AddEventDialog>
                <AddEventDialog eventType="opportunity">
                  <Button className="w-full justify-start" variant={"ghost"}>
                    <Square className="size-2 rounded-sm bg-purple-600 text-purple-600" />
                    Opportunity
                  </Button>
                </AddEventDialog>
              </PopoverContent>
            </Popover>
          </Protect>
        </ContentAreaHeader>
        <Separator />
        <ContentAreaContainer>
          <SchedulerWithContext />
        </ContentAreaContainer>
      </ContentArea>
    </ScheduleContextProvider>
  );
}
