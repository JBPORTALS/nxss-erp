import React, { useState } from "react";
import moment from "moment";
import {
  Event,
  EventProps,
  momentLocalizer,
  Calendar as ScheduleCalendar,
  ToolbarProps,
} from "react-big-calendar";

import "react-big-calendar/lib/css/react-big-calendar.css";

import { ArrowLeft, ArrowRight, CalendarIcon } from "lucide-react";

import { cn } from ".";
import { Button } from "./button";

import "./styles.css";

import { DialogTitle } from "@radix-ui/react-dialog";
import { format } from "date-fns";

import { Calendar } from "./calendar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "./dialog";
import { Input } from "./input";
import { Label } from "./label";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";

// Setup the localizer for react-big-calendar
const localizer = momentLocalizer(moment);

// Custom toolbar component
const CustomToolbar = ({ label, onNavigate, onView }: ToolbarProps) => (
  <div className="mb-4 flex items-center justify-between p-2">
    <div className="flex gap-2">
      <Button
        size={"icon"}
        onClick={() => onNavigate("PREV")}
        variant={"outline"}
      >
        <ArrowLeft className="size-5" />
      </Button>
      <Button
        size={"icon"}
        onClick={() => onNavigate("NEXT")}
        variant={"outline"}
      >
        <ArrowRight className="size-5" />
      </Button>
    </div>
    <span className="text-lg font-semibold">{label}</span>
    <Button size={"lg"} onClick={() => onNavigate("TODAY")} variant={"outline"}>
      Today
    </Button>
  </div>
);

// Custom event component
const EventComponent = ({
  event,
}: EventProps & {
  event: { title: string; color: string };
}) => (
  <div
    className={cn(
      "h-full w-full overflow-hidden text-ellipsis whitespace-nowrap rounded-md bg-transparent p-1 text-xs",
      event.color === "green" && "bg-green-700 !text-green-100",
      event.color === "blue" && "bg-indigo-600 !text-blue-100",
      event.color === "yellow" && "bg-yellow-600 !text-yellow-100",
      event.color === "red" && "bg-red-600 !text-red-100",
    )}
  >
    <h5>{event.title}</h5>
  </div>
);

const EventDialog = (props: React.ComponentProps<typeof Dialog>) => {
  const [selectedType, setSelectedType] = useState("Holiday");
  const [date, setDate] = React.useState<Date>();

  const renderForm = () => {
    switch (selectedType) {
      case "Holiday":
        return (
          <>
            <div className="mb-4 space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Holiday for
              </label>
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="All" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  {/* Add more options as needed */}
                </SelectContent>
              </Select>
            </div>
            <div className="mb-4 flex items-center">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !date && "text-muted-foreground",
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="single" selected={date} onSelect={setDate} />
                </PopoverContent>
              </Popover>
            </div>
          </>
        );
      case "Event":
        return (
          <>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Event for
              </label>
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="All" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  {/* Add more options as needed */}
                </SelectContent>
              </Select>
            </div>
            <div className="mb-4 flex items-center">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-[280px] justify-start text-left font-normal",
                      !date && "text-muted-foreground",
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="single" selected={date} onSelect={setDate} />
                </PopoverContent>
              </Popover>
            </div>
            <div className="mb-4">
              <Input type="text" placeholder="Add location" />
            </div>
            <div className="mb-4">
              <Input type="text" placeholder="Add Place" />
            </div>
            <div className="mb-4">
              <Input type="text" placeholder="Add description or attachments" />
            </div>
          </>
        );

      case "Opportunity":
        return (
          <>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Opportunity for
              </label>
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="All" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  {/* Add more options as needed */}
                </SelectContent>
              </Select>
            </div>
            <div className="mb-4 flex items-center">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-[280px] justify-start text-left font-normal",
                      !date && "text-muted-foreground",
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="single" selected={date} onSelect={setDate} />
                </PopoverContent>
              </Popover>
            </div>
          </>
        );
      // Add cases for 'Opportunity' and 'Exam Schedule' as needed
      default:
        return null;
    }
  };

  return (
    <Dialog {...props}>
      <DialogContent className="sm:max-w-[900px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            Add {selectedType}
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Input type="text" placeholder="Add title" className="h-11 text-lg" />
          <div className="flex space-x-2">
            {["Holiday", "Event", "Opportunity", "Exam Schedule"].map(
              (type) => (
                <Button
                  key={type}
                  variant={selectedType === type ? "primary" : "outline"}
                  onClick={() => setSelectedType(type)}
                >
                  {type}
                </Button>
              ),
            )}
          </div>
          {renderForm()}
        </div>
        <Button className="ml-auto w-fit" size={"lg"}>
          Save
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export const Scheduler = () => {
  const [date, setDate] = React.useState<Date>();

  const [events] = useState([
    {
      title: "Ethnic day",
      start: new Date(2024, 5, 4, 9, 0),
      end: new Date(2024, 5, 4, 12, 30),
      color: "green",
    },
    {
      title: "Picknic day",
      start: new Date(2024, 5, 4),
      end: new Date(2024, 5, 4),
      color: "green",
    },
    {
      title: "Panic day",
      start: new Date(2024, 5, 4),
      end: new Date(2024, 5, 4),
      color: "green",
    },
    {
      title: "Rose day",
      start: new Date(2024, 5, 4),
      end: new Date(2024, 5, 4),
      color: "green",
    },
    {
      title: "Bakrid",
      start: new Date(2024, 5, 11),
      end: new Date(2024, 5, 11),
      color: "blue",
    },
    {
      title: "Seminars",
      start: new Date(2024, 5, 18),
      end: new Date(2024, 5, 18),
      color: "yellow",
    },
    {
      title: "UGC Exam",
      start: new Date(2024, 5, 25, 9, 0),
      end: new Date(2024, 5, 25, 12, 0),
      color: "red",
    },
  ]);
  const [selected, setSelected] = useState<Event | undefined>(undefined);

  return (
    <>
      <div className="h-[980px] w-full bg-background [&_*]:!border-border [&_.rbc-event.rbc-selected]:scale-105 [&_.rbc-event.rbc-selected]:bg-transparent [&_.rbc-event.rbc-selected]:text-primary-foreground [&_.rbc-event.rbc-selected]:opacity-100 [&_.rbc-event.rbc-selected]:shadow-lg [&_.rbc-event]:border-none [&_.rbc-event]:p-0 [&_.rbc-event]:text-primary-foreground [&_.rbc-event]:opacity-90 [&_.rbc-header]:border-border [&_.rbc-header]:bg-secondary/15 [&_.rbc-now>.rbc-button-link]:text-xl [&_.rbc-now>.rbc-button-link]:font-bold [&_.rbc-now>.rbc-button-link]:text-primary">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-[280px] justify-start text-left font-normal",
                !date && "text-muted-foreground",
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? format(date, "PPP") : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar mode="single" selected={date} onSelect={setDate} />
          </PopoverContent>
        </Popover>
        <ScheduleCalendar
          view="month"
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          defaultDate={new Date(2024, 5, 1)}
          components={{
            toolbar: CustomToolbar,
            event: EventComponent,
            dateCellWrapper: ({ children }) => (
              <div
                className="pointer-events-auto h-full w-full bg-background has-[.rbc-off-range-bg]:bg-accent/50"
                children={children}
              />
            ),
            header: (props) => (
              <div className="flex h-12 w-full items-center justify-center [&<.rbc-button-link]:bg-red-100">
                {props.label}
              </div>
            ),
          }}
          enableAutoScroll
          selected={selected}
          onSelectEvent={(event) => setSelected(event)}
          drilldownView={"month"}
          views={["month", "day", "week"]}
          className="rbc-calendar"
        />
      </div>
      <EventDialog
        open={!!selected}
        onOpenChange={(open) => {
          if (!open) {
            setSelected(undefined);
          }
        }}
      />
    </>
  );
};
