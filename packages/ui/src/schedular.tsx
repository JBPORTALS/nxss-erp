import React from "react";
import moment from "moment";
import {
  momentLocalizer,
  Calendar as ScheduleCalendar,
} from "react-big-calendar";

import "react-big-calendar/lib/css/react-big-calendar.css";
import "./styles.css";

import { cn } from ".";

// Setup the localizer for react-big-calendar
const localizer = momentLocalizer(moment);

export const Scheduler = ({
  className,
  ...props
}: Omit<React.ComponentProps<typeof ScheduleCalendar>, "localizer">) => {
  return (
    <div
      className={cn(
        "dark w-full bg-background [&_*]:!border-border [&_.rbc-event.rbc-selected]:scale-105 [&_.rbc-event.rbc-selected]:bg-transparent [&_.rbc-event.rbc-selected]:text-primary-foreground [&_.rbc-event.rbc-selected]:opacity-100 [&_.rbc-event.rbc-selected]:shadow-lg [&_.rbc-event]:border-none [&_.rbc-event]:p-0 [&_.rbc-event]:text-primary-foreground [&_.rbc-event]:opacity-90 [&_.rbc-header]:border-border [&_.rbc-header]:bg-secondary/15 [&_.rbc-now>.rbc-button-link]:text-xl [&_.rbc-now>.rbc-button-link]:font-bold [&_.rbc-now>.rbc-button-link]:text-primary",
        className,
      )}
    >
      <ScheduleCalendar
        {...{ localizer }}
        components={{
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
          ...props.components,
        }}
        className="rbc-calendar"
        {...props}
      />
    </div>
  );
};
