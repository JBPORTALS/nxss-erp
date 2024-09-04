import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { asc, eq, schema } from "@nxss/db";
import {
  CreateCalendarEventScheme,
  UpdateCalendarEventScheme,
} from "@nxss/validators";

import { protectedProcedure, router } from "../trpc";

const { calendar, calendarBranches } = schema;
// Calendar Event Router
export const calendarRouter = router({
  // Get the list of calendar events
  getEventList: protectedProcedure.query(async ({ ctx }) => {
    const events = await ctx.db.query.calendar.findMany({
      orderBy: asc(calendar.start_date),
      with: {
        calendarBranches: true,
      },
    });

    return events;
  }),

  // Get details of a specific calendar event
  getEventDetails: protectedProcedure
    .input(z.object({ id: z.number().min(1, "Event ID is required") }))
    .query(async ({ ctx, input }) => {
      const event = await ctx.db.query.calendar.findFirst({
        where: eq(calendar.id, input.id),
        with: {
          calendarBranches: true,
        },
      });

      if (!event) {
        throw new TRPCError({
          message: "Event not found",
          code: "NOT_FOUND",
        });
      }

      return event;
    }),

  // Create a new calendar event
  createEvent: protectedProcedure
    .input(CreateCalendarEventScheme)
    .mutation(async ({ ctx, input }) => {
      const event = await ctx.db
        .insert(calendar)
        .values({
          title: input.title,
          description: input.description,
          event_type: input.event_type,
          audience_type: input.audience_type,
          is_all_day: input.is_all_day,
          start_date: input.start_date,
          end_date: input.end_date,
          location: input.location,
          attachment_url: input.attachment_url,
        })
        .returning();

      if (!event.at(0)?.id) {
        throw new TRPCError({
          message: "Unable to create the event, please retry",
          code: "BAD_REQUEST",
        });
      }

      return event.at(0);
    }),

  // Update an existing calendar event
  updateEvent: protectedProcedure
    .input(UpdateCalendarEventScheme)
    .mutation(async ({ ctx, input }) => {
      const response = await ctx.db
        .update(calendar)
        .set({
          title: input.title,
          description: input.description,
          event_type: input.event_type,
          audience_type: input.audience_type,
          is_all_day: input.is_all_day,
          start_date: input.start_date,
          end_date: input.end_date,
          location: input.location,
          attachment_url: input.attachment_url,
        })
        .where(eq(calendar.id, input.id))
        .returning();

      if (!response.at(0)?.id) {
        throw new TRPCError({
          message: "Unable to update the event, please retry",
          code: "BAD_REQUEST",
        });
      }

      return response.at(0);
    }),

  // Delete a calendar event
  deleteEvent: protectedProcedure
    .input(z.object({ id: z.number().min(1, "Event ID is required") }))
    .mutation(async ({ ctx, input }) => {
      const response = await ctx.db
        .delete(calendar)
        .where(eq(calendar.id, input.id))
        .returning();

      if (!response.at(0)?.id) {
        throw new TRPCError({
          message: "Unable to delete the event, please retry",
          code: "BAD_REQUEST",
        });
      }

      return response.at(0);
    }),

  // Get branches related to a specific calendar event
  getEventBranches: protectedProcedure
    .input(z.object({ event_id: z.number().min(1, "Event ID is required") }))
    .query(async ({ ctx, input }) => {
      const branches = await ctx.db.query.calendarBranches.findMany({
        where: eq(calendarBranches.calendar_id, input.event_id),
        with: {
          branch: true,
          semester: true,
        },
      });

      return branches;
    }),

  // Add branches to a calendar event
  addEventBranches: protectedProcedure
    .input(
      z.object({
        event_id: z.number().min(1, "Event ID is required"),
        branches: z.array(
          z.object({
            branch_id: z.number().min(1, "Branch ID is required"),
            semester_id: z
              .number()
              .min(1, "Semester ID is required")
              .optional(),
            section: z.string().optional(),
            batch: z.string().optional(),
          }),
        ),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const responses = await Promise.all(
        input.branches.map((branch) =>
          ctx.db
            .insert(calendarBranches)
            .values({
              calendar_id: input.event_id,
              branch_id: branch.branch_id,
              semester_id: branch.semester_id,
              section: branch.section,
              batch: branch.batch,
            })
            .returning(),
        ),
      );

      const allResponses = responses.flat();

      if (allResponses.length === 0) {
        throw new TRPCError({
          message: "Unable to add branches to the event, please retry",
          code: "BAD_REQUEST",
        });
      }

      return allResponses;
    }),
});
