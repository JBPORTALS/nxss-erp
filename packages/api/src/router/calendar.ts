// import { TRPCError } from "@trpc/server";
// import {
//   endOfDay,
//   endOfMonth,
//   formatDistanceToNow,
//   isFuture,
//   isPast,
//   isSameDay,
//   isWithinInterval,
//   startOfDay,
//   startOfMonth,
// } from "date-fns";
// import { z } from "zod";

// import {
//   and,
//   asc,
//   between,
//   eq,
//   eventTypeEnum,
//   gt,
//   gte,
//   inArray,
//   isNull,
//   lt,
//   lte,
//   or,
//   schema,
// } from "@nxss/db";
// import { insertCalendarSchema, Students } from "@nxss/db/schema";
// import {
//   CreateCalendarEventScheme,
//   UpdateCalendarEventScheme,
// } from "@nxss/validators";

// import { protectedProcedure, router } from "../trpc";

// const { Calendar, CalendarBranches } = schema;
// // Calendar Event Router
// export const calendarRouter = router({
//   // Get the list of Calendar events
//   getEventList: protectedProcedure
//     .input(
//       z.object({
//         date: z.date({ required_error: "Date is missing" }),
//         typeFilter: z.array(z.enum(["event", "holiday", "opportunity"])),
//         audienceType: z.enum(["staff", "Students", "all"]).optional(),
//       }),
//     )
//     .query(async ({ ctx, input }) => {
//       const { date, typeFilter, audienceType } = input;
//       const fromDate = startOfMonth(date);
//       const toDate = endOfMonth(date);

//       const events = await ctx.db.query.Calendar.findMany({
//         where: and(
//           between(Calendar.startDate, fromDate, toDate),
//           typeFilter.length !== 0
//             ? inArray(Calendar.eventType, typeFilter)
//             : undefined,
//           audienceType === "staff"
//             ? or(
//                 eq(Calendar.audienceType, "staff"),
//                 eq(Calendar.audienceType, "all"),
//               )
//             : undefined,
//         ),
//         orderBy: asc(Calendar.startDate),
//         with: {
//           calendarBranches: true,
//         },
//       });

//       return events;
//     }),
//   getEventByType: protectedProcedure
//     .input(
//       z.object({
//         eventType: z.enum(eventTypeEnum.enumValues),
//       }),
//     )

//     .query(async ({ ctx, input }) => {
//       const events = await ctx.db.query.Calendar.findMany({
//         where: eq(Calendar.eventType, input.eventType),
//         orderBy: asc(Calendar.startDate),
//         with: {
//           calendarBranches: true,
//         },
//       });
//       if (!events) {
//         throw new TRPCError({
//           message: "Event not found",
//           code: "NOT_FOUND",
//         });
//       }
//       return events;
//     }),
//   // Get details of a specific Calendar event
//   getEventDetails: protectedProcedure
//     .input(z.object({ id: z.string().min(1, "Event ID is required") }))
//     .query(async ({ ctx, input }) => {
//       const event = await ctx.db.query.Calendar.findFirst({
//         where: eq(Calendar.id, input.id),
//         with: {
//           calendarBranches: {
//             with: {
//               Branch: true,
//               Semester: true,
//             },
//           },
//         },
//       });

//       if (!event) {
//         throw new TRPCError({
//           message: "Event not found",
//           code: "NOT_FOUND",
//         });
//       }

//       return event;
//     }),

//   // Create a new Calendar event
//   createEvent: protectedProcedure
//     .input(insertCalendarSchema)
//     .mutation(async ({ ctx, input }) => {
//       const event = await ctx.db.insert(Calendar).values(input).returning();

//       const eventId = event.at(0)?.id;

//       if (!eventId) {
//         throw new TRPCError({
//           message: "Unable to create the event, please retry",
//           code: "BAD_REQUEST",
//         });
//       }

//       /**
//        *  @todo Need to merge it finally in transaction
//        */
//       const scope = await ctx.db.insert(CalendarBranches).values({
//         c: eventId,
//         branch_id: input.scope?.branchId,
//         semester_id: input.scope?.semesterId,
//         section: input.scope?.sectionId,
//         batch: input.scope?.batchId,
//       });

//       if (scope.rowCount !== 1) {
//         throw new TRPCError({
//           message: "Unable to create the scope for event, please retry",
//           code: "BAD_REQUEST",
//         });
//       }
//       return event.at(0);
//     }),

//   // Update an existing Calendar event
//   updateEvent: protectedProcedure
//     .input(UpdateCalendarEventScheme)
//     .mutation(async ({ ctx, input }) => {
//       const response = await ctx.db
//         .update(Calendar)
//         .set({
//           title: input.title,
//           description:
//             input.description && input.description?.length > 0
//               ? input.description
//               : null,
//           eventType: input.eventType,
//           audienceType: input.audienceType,
//           is_all_day: !input.includeTime,
//           startDate: input.datetime?.from,
//           end_date: input.datetime?.to,
//           location:
//             input.location && input.location?.length > 0
//               ? input.location
//               : null,
//           attachment_url: input.attachmentUrl,
//         })
//         .where(eq(Calendar.id, input.id))
//         .returning();

//       if (!response.at(0)?.id) {
//         throw new TRPCError({
//           message: "Unable to update the event, please retry",
//           code: "BAD_REQUEST",
//         });
//       }

//       if (input.audienceType !== "all")
//         await ctx.db.update(calendarBranches).set({
//           branch_id: input.scope?.branchId ?? null,
//           semester_id: input.scope?.semesterId ?? null,
//           section: input.scope?.sectionId ?? null,
//           batch: input.scope?.batchId ?? null,
//         });

//       return response.at(0);
//     }),

//   // Delete a Calendar event
//   deleteEvent: protectedProcedure
//     .input(z.object({ id: z.number().min(1, "Event ID is required") }))
//     .mutation(async ({ ctx, input }) => {
//       const response = await ctx.db
//         .delete(Calendar)
//         .where(eq(Calendar.id, input.id))
//         .returning();

//       if (!response.at(0)?.id) {
//         throw new TRPCError({
//           message: "Unable to delete the event, please retry",
//           code: "BAD_REQUEST",
//         });
//       }

//       return response.at(0);
//     }),

//   // Get branches related to a specific Calendar event
//   getEventBranches: protectedProcedure
//     .input(z.object({ event_id: z.number().min(1, "Event ID is required") }))
//     .query(async ({ ctx, input }) => {
//       const branches = await ctx.db.query.calendarBranches.findMany({
//         where: eq(calendarBranches.calendar_id, input.event_id),
//         with: {
//           branch: true,
//           semester: true,
//         },
//       });

//       return branches;
//     }),

//   // Add branches to a Calendar event
//   addEventBranches: protectedProcedure
//     .input(
//       z.object({
//         event_id: z.number().min(1, "Event ID is required"),
//         branches: z.array(
//           z.object({
//             branch_id: z.number().min(1, "Branch ID is required"),
//             semester_id: z
//               .number()
//               .min(1, "Semester ID is required")
//               .optional(),
//             section: z.number().min(1, "Semester ID is required").optional(),
//             batch: z.number().min(1, "Semester ID is required").optional(),
//           }),
//         ),
//       }),
//     )
//     .mutation(async ({ ctx, input }) => {
//       const responses = await Promise.all(
//         input.branches.map((branch) =>
//           ctx.db
//             .insert(calendarBranches)
//             .values({
//               calendar_id: input.event_id,
//               branch_id: branch.branch_id,
//               semester_id: branch.semester_id,
//               section: branch.section,
//               batch: branch.batch,
//             })
//             .returning(),
//         ),
//       );

//       const allResponses = responses.flat();

//       if (allResponses.length === 0) {
//         throw new TRPCError({
//           message: "Unable to add branches to the event, please retry",
//           code: "BAD_REQUEST",
//         });
//       }

//       return allResponses;
//     }),
//   getStudentEvents: protectedProcedure
//     .input(
//       z.object({
//         date: z.date({ required_error: "Date is missing" }).optional(),
//       }),
//     )
//     .query(async ({ ctx, input }) => {
//       const date = input.date;
//       // Step 1: Find the student's details
//       const student = await ctx.db.query.Students.findFirst({
//         where: eq(Students.clerk_user_id, ctx.auth.userId),
//         with: {
//           batch: {
//             with: {
//               section: {
//                 with: {
//                   semester: {
//                     with: {
//                       branch: true,
//                     },
//                   },
//                 },
//               },
//             },
//           },
//         },
//       });

//       if (!student) {
//         throw new TRPCError({
//           message: "Student not found",
//           code: "NOT_FOUND",
//         });
//       }

//       // console.log("student", student);

//       const semester_id = student.current_semester_id;
//       const branch_id = student.branch_id;
//       const batch_id = student.batch_id;
//       const section_id = student.batch?.section_id;

//       if (!date)
//         throw new TRPCError({
//           message: "date not defined",
//           code: "BAD_REQUEST",
//         });

//       // Step 2: Fetch related events

//       const startOfQueryDate = startOfDay(date);
//       const endOfQueryDate = endOfDay(date);

//       const events = await ctx.db.query.Calendar.findMany({
//         where: and(
//           or(
//             between(Calendar.startDate, startOfQueryDate, endOfQueryDate),
//             and(
//               lt(Calendar.startDate, endOfQueryDate),
//               or(
//                 gt(Calendar.end_date, startOfQueryDate),
//                 eq(Calendar.end_date, endOfQueryDate),
//               ),
//             ),
//           ),
//           or(
//             eq(Calendar.audienceType, "all"),
//             eq(Calendar.audienceType, "Students"),
//           ),
//         ),
//         with: {
//           calendarBranches: {
//             where: and(
//               or(
//                 eq(calendarBranches.branch_id, branch_id),
//                 isNull(calendarBranches.branch_id),
//               ),
//               or(
//                 eq(calendarBranches.semester_id, semester_id),
//                 isNull(calendarBranches.semester_id),
//               ),
//               or(
//                 section_id
//                   ? eq(calendarBranches.section, section_id)
//                   : undefined,
//                 isNull(calendarBranches.section),
//               ),
//               or(
//                 batch_id ? eq(calendarBranches.batch, batch_id) : undefined,
//                 isNull(calendarBranches.batch),
//               ),
//             ),
//           },
//         },
//       });

//       // Filter out events that don't have matching calendarBranches
//       const now = new Date();
//       const filteredEvents = events
//         .filter((event) => event.calendarBranches.length > 0)
//         .map((event) => {
//           let formattedTime: string;
//           const startDate = new Date(event.startDate);
//           const endDate = event.end_date ? new Date(event.end_date) : null;

//           if (isPast(startDate) && (!endDate || isPast(endDate))) {
//             // Event is completed
//             formattedTime = `about ${formatDistanceToNow(startDate)} ago`;
//           } else if (isFuture(startDate)) {
//             // Event is upcoming
//             formattedTime = `in ${formatDistanceToNow(startDate)}`;
//           } else if (
//             isWithinInterval(now, { start: startDate, end: endDate || now })
//           ) {
//             // Event is ongoing
//             formattedTime = "Now";
//           } else {
//             // Fallback: just show the start date
//             formattedTime = formatDistanceToNow(startDate);
//           }

//           return {
//             ...event,
//             formattedTime,
//             isSlotStart: isSameDay(startDate, date),
//             isSlotEnd: endDate
//               ? isSameDay(endDate, date)
//               : isSameDay(startDate, date),
//           };
//         });

//       return filteredEvents;
//     }),
// });
