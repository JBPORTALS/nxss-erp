import React from "react";
import moment from "moment";
import {
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
        "w-full bg-background [&_*]:!border-border [&_.rbc-event.rbc-selected]:bg-transparent [&_.rbc-event.rbc-selected]:text-primary-foreground [&_.rbc-event.rbc-selected]:opacity-100 [&_.rbc-event.rbc-selected]:shadow-lg [&_.rbc-event]:border-none [&_.rbc-event]:p-0 [&_.rbc-event]:text-primary-foreground [&_.rbc-event]:opacity-90 [&_.rbc-header]:flex [&_.rbc-header]:h-10 [&_.rbc-header]:items-center [&_.rbc-header]:justify-center [&_.rbc-header]:border-white [&_.rbc-header]:bg-secondary/15 [&_.rbc-now>.rbc-button-link]:text-xl [&_.rbc-now>.rbc-button-link]:font-bold [&_.rbc-now>.rbc-button-link]:text-primary [&_.rbc-off-range-bg]:bg-accent/25",
        className,
      )}
    >
      <ScheduleCalendar
        {...{ localizer }}
        components={{
          dateCellWrapper: ({ children }) => (
            <div
              className="pointer-events-auto h-full w-full border-r bg-background last:border-0 has-[.rbc-off-range-bg]:bg-accent/15"
              children={children}
            />
          ),
          header: (props) => (
            <div className="flex h-12 w-full items-center justify-center [&<.rbc-button-link]:bg-red-100">
              {props.label}
            </div>
          ),
          event: (props) => (
            <div {...props} className="rounded-md bg-indigo-700 p-0.5">
              <span className="px-0.5 text-xs text-white">{props.title}</span>
            </div>
          ),
          toolbar: components?.toolbar,
        }}
        className="rbc-calendar"
        {...props}
      />
    </div>
  );
};

export type * from "react-big-calendar";
