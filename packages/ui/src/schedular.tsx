import React from "react";
import { format, getDay, parse, startOfWeek } from "date-fns";
import {
  dateFnsLocalizer,
  Event,
  EventProps,
  EventWrapperProps,
  Calendar as ScheduleCalendar,
} from "react-big-calendar";

import "react-big-calendar/lib/css/react-big-calendar.css";

import { cva, VariantProps } from "class-variance-authority";

import { cn } from ".";

const locales = {
  "en-IN": require("date-fns"),
};

// Setup the localizer for react-big-calendar
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const eventVariants = cva(
  "rounded-lg [&_.rbc-event-label]:p-1 [&_.rbc-event-label]:!text-white",
  {
    variants: {
      type: {
        event: "[&_.rbc-event]:bg-indigo-600",
        opportunity: "[&_.rbc-event]:bg-purple-600",
        holiday: "[&_.rbc-event]:bg-green-700",
      },
    },
  },
);

type CustomEvent = Event & VariantProps<typeof eventVariants>;

export const Scheduler = ({
  className,
  components,
  ...props
}: Omit<React.ComponentProps<typeof ScheduleCalendar>, "localizer">) => {
  return (
    <div
      className={cn(
        "w-full bg-background [&_*]:!border-border [&_.rbc-allday-cell.rbc-row-bg]:bg-secondary/15 [&_.rbc-day-slot_.rbc-time-slot]:border-t-0 [&_.rbc-event.rbc-selected]:bg-transparent [&_.rbc-event.rbc-selected]:text-primary-foreground [&_.rbc-event.rbc-selected]:opacity-100 [&_.rbc-event.rbc-selected]:shadow-lg [&_.rbc-event]:border-none [&_.rbc-event]:p-0 [&_.rbc-event]:text-primary-foreground [&_.rbc-event]:opacity-90 [&_.rbc-header]:flex [&_.rbc-header]:h-10 [&_.rbc-header]:items-center [&_.rbc-header]:justify-center [&_.rbc-header]:border-white [&_.rbc-header]:bg-secondary/15 [&_.rbc-label]:text-base [&_.rbc-label]:text-muted-foreground [&_.rbc-month-view]:rounded-md [&_.rbc-now>.rbc-button-link]:text-xl [&_.rbc-now>.rbc-button-link]:font-bold [&_.rbc-now>.rbc-button-link]:text-primary [&_.rbc-off-range-bg]:bg-accent/25 [&_.rbc-time-view]:rounded-md [&_.rbc-timeslot-group]:min-h-16 [&_.rbc-today]:bg-primary/5",
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
          event: ({ ...props }: EventProps) => {
            const event = props.event as CustomEvent;
            return (
              <div className={cn(`rounded-md px-1 py-[1px]`)}>
                <span className="rbc-event-label !text-xs">{props.title}</span>
              </div>
            );
          },
          eventWrapper: (props) => {
            console.log("event props", props);

            const customProps = props as EventWrapperProps & {
              continuesPrior: boolean;
              continuesAfter: boolean;
            };

            const event = customProps.event as CustomEvent;

            return (
              <div
                {...props}
                style={{
                  ...props.style,
                }}
                className={cn(
                  eventVariants({
                    type: event.type,
                    className: props.className,
                  }),
                )}
              />
            );
          },
          timeGutterHeader: () => (
            <div className="flex h-full w-full items-center justify-center">
              GMT+
            </div>
          ),
          ...components,
        }}
        className="rbc-calendar"
      />
    </div>
  );
};

export type * from "react-big-calendar";
