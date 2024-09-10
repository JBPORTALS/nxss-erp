"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import { format, set, subDays } from "date-fns";
import { ArrowRight, CalendarIcon, PinIcon, Square, Text } from "lucide-react";
import { z } from "zod";

import { RouterOutputs } from "@nxss/api";
import { cn } from "@nxss/ui";
import { Button, buttonVariants } from "@nxss/ui/button";
import { Calendar } from "@nxss/ui/calendar";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@nxss/ui/card";
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
import { Separator } from "@nxss/ui/seperator";
import { Switch } from "@nxss/ui/switch";
import { Textarea } from "@nxss/ui/textarea";
import { toast } from "@nxss/ui/toast";
import { eventSchema } from "@nxss/validators";

import { api } from "~/trpc/react";

export function EventDetialsForm({
  event,
}: {
  event: RouterOutputs["calendar"]["getEventDetails"];
}) {
  const form = useForm({
    schema: eventSchema,
    defaultValues: {
      title: event.title,
      description: event.description ?? "",
      location: event.location ?? "",
      datetime: {
        from: event.start_date,
        to: event.end_date ?? undefined,
      },
      includeTime: !event.is_all_day,
    },
  });
  const { mutateAsync: updateEventMutate, isPending: isUpdating } =
    api.calendar.updateEvent.useMutation({
      onSuccess: () => {
        toast.info("Event detials updated");
      },
    });
  const router = useRouter();
  const { mutateAsync: deleteEventMutate, isPending: isDeleting } =
    api.calendar.deleteEvent.useMutation({
      onSuccess: () => {
        toast.success("Event deleted successfully");
        router.back();
      },
    });
  const event_id = useParams().event_id as string;

  async function onUpdate(values: z.infer<typeof eventSchema>) {
    await updateEventMutate({
      id: parseInt(event_id),
      title: values.title,
      start_date: values?.datetime?.from,
      end_date: values?.datetime?.to,
      description: values.description,
      location: values.location,
      is_all_day: !values.includeTime,
    });
  }

  return (
    <Card className="w-2/4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onUpdate)}>
          <CardHeader>
            <CardTitle className="space-x-2 text-3xl">
              <Square
                className={cn(
                  "size-6 rounded-sm",
                  event.event_type === "event" &&
                    "bg-indigo-600 text-indigo-600",
                  event.event_type === "holiday" &&
                    "bg-green-600 text-green-600",
                  event.event_type === "opportunity" &&
                    "bg-purple-600 text-purple-600",
                )}
              />
              <Input
                value={event.title}
                className="border-none px-1 text-2xl shadow-none focus-visible:ring-0"
              />
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <FormField
              control={form.control}
              name="datetime"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <div className="flex w-full items-center gap-2">
                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"ghost"}
                            className={cn(
                              "w-full justify-start pl-3 text-left font-normal",
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
                                            ? format(
                                                fromTimeField.value,
                                                "HH:mm",
                                              )
                                            : "00:00"
                                        }
                                        onChange={(e) => {
                                          const [hours, minutes] =
                                            e.target.value
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
                                          const [hours, minutes] =
                                            e.target.value
                                              .split(":")
                                              .map(Number);

                                          if (field?.value?.to)
                                            form.setValue(
                                              "datetime.to",
                                              set(field?.value?.to, {
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
                          defaultMonth={field.value?.to ?? field?.value?.from}
                          numberOfMonths={1}
                          showOutsideDays
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) => date < subDays(new Date(), 1)}
                          initialFocus
                          className="w-full"
                        />
                        <Separator />
                        <div className="w-full gap-1 p-2">
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
                      </PopoverContent>
                    </Popover>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="flex w-full flex-col">
                  <div className="flex w-full gap-2">
                    <Text className="ml-auto mt-2.5 h-4 w-4 opacity-50" />
                    <Textarea
                      {...field}
                      placeholder="No description"
                      className={cn(
                        buttonVariants({ variant: "ghost" }),
                        "h-fit min-h-[140px] border-none px-2 font-normal shadow-none outline-none focus-visible:ring-0",
                      )}
                    />
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            {event.event_type !== "holiday" && (
              <div className="flex gap-2">
                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem className="flex w-full flex-col">
                      <div className="flex w-full gap-2">
                        <PinIcon className="mt-2.5 size-5 text-muted-foreground" />
                        <Textarea
                          {...field}
                          placeholder="No location detials..."
                          className={cn(
                            buttonVariants({ variant: "ghost" }),
                            "h-fit min-h-[140px] border-none px-2 font-normal shadow-none outline-none focus-visible:ring-0",
                          )}
                        />
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}
          </CardContent>
          <CardFooter className="flex items-center justify-end gap-4">
            <Button
              isLoading={isDeleting}
              onClick={() => deleteEventMutate({ id: parseInt(event_id) })}
              variant={"destructive"}
              size={"lg"}
              type="button"
            >
              Delete
            </Button>
            <Button isLoading={isUpdating} size={"lg"} type="submit">
              Save
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
