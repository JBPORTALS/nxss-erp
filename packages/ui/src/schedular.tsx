import React from "react";
import moment from "moment";
import {
  EventProps,
  EventWrapperProps,
  momentLocalizer,
  Calendar as ScheduleCalendar,
} from "react-big-calendar";

import "react-big-calendar/lib/css/react-big-calendar.css";

import { cn } from ".";

// Setup the localizer for react-big-calendar
const localizer = momentLocalizer(moment);

export const Scheduler = ({
  className,
  components,
  ...props
}: Omit<React.ComponentProps<typeof ScheduleCalendar>, "localizer">) => {
  return (
    <div
      className={cn(
        "w-full bg-background [&_*]:!border-border [&_.rbc-allday-cell.rbc-row-bg]:bg-secondary/15 [&_.rbc-day-slot_.rbc-time-slot]:border-t-0 [&_.rbc-event.rbc-selected]:bg-transparent [&_.rbc-event.rbc-selected]:text-primary-foreground [&_.rbc-event.rbc-selected]:opacity-100 [&_.rbc-event.rbc-selected]:shadow-lg [&_.rbc-event]:border-none [&_.rbc-event]:p-0 [&_.rbc-event]:text-primary-foreground [&_.rbc-event]:opacity-90 [&_.rbc-header]:flex [&_.rbc-header]:h-10 [&_.rbc-header]:items-center [&_.rbc-header]:justify-center [&_.rbc-header]:border-white [&_.rbc-header]:bg-secondary/15 [&_.rbc-label]:text-base [&_.rbc-label]:text-muted-foreground [&_.rbc-now>.rbc-button-link]:text-xl [&_.rbc-now>.rbc-button-link]:font-bold [&_.rbc-now>.rbc-button-link]:text-primary [&_.rbc-off-range-bg]:bg-accent/25 [&_.rbc-timeslot-group]:min-h-16 [&_.rbc-today]:bg-primary/5",
        className,
      )}
    >
      <ScheduleCalendar
        {...props}
        {...{ localizer }}
        components={{
          dateCellWrapper: ({ children }) => (
            <div
              className="pointer-events-auto h-full w-full border-r bg-transparent last:border-0 has-[.rbc-off-range-bg]:bg-accent/15"
              children={children}
            />
          ),
          header: (props) => (
            <div className="flex h-12 w-full items-center justify-center [&<.rbc-button-link]:bg-red-100">
              {props.label}
            </div>
          ),
          event: ({ ...props }: EventProps) => (
            <div className={"rounded-md bg-indigo-600 px-1 py-[1px]"}>
              <span className="text-xs text-white">{props.title}</span>
            </div>
          ),
          eventContainerWrapper: (props) => (
            <div
              className="[&_.rbc-event-label]:text-white [&_.rbc-event]:!bg-indigo-600"
              {...props}
            />
          ),
          ...components,
        }}
        className="rbc-calendar"
      />
    </div>
  );
};

export type * from "react-big-calendar";
