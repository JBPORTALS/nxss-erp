import { createId } from "@paralleldrive/cuid2";
import { relations } from "drizzle-orm";
import {
  createInsertSchema,
  createSelectSchema,
  createUpdateSchema,
} from "drizzle-zod";

import { pgTable } from "./_table";
import { Branches } from "./branches";
import { audienceTypeEnum, eventTypeEnum } from "./enum";
import { Batches, Sections } from "./groups";
import { Semesters } from "./semesters";

export const Calendar = pgTable("calendar", (t) => ({
  id: t
    .text()
    .$defaultFn(() => createId())
    .primaryKey(),
  title: t.text().notNull(),
  description: t.text(),
  eventType: eventTypeEnum("event_type").notNull(),
  audienceType: audienceTypeEnum("audience_type").notNull(),
  isAllDay: t.boolean().default(false),
  startDate: t.timestamp().notNull(),
  endDate: t.timestamp(),
  location: t.text(),
  attachmentUrl: t.text(),
  createdAt: t
    .timestamp({ mode: "date", withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: t
    .timestamp({ mode: "date", withTimezone: true })
    .$onUpdateFn(() => new Date()),
}));

export const selectCalendarSchema = createSelectSchema(Calendar);
export const insertCalendarSchema = createInsertSchema(Calendar);
export const updateCalendarSchema = createUpdateSchema(Calendar);

// Calendar Branches Relation Table
export const CalendarBranches = pgTable("calendar_branches", (t) => ({
  id: t
    .text()
    .$defaultFn(() => createId())
    .primaryKey(),
  calendarId: t
    .text()
    .notNull()
    .references(() => Calendar.id, { onDelete: "cascade" }),
  branchId: t.text().references(() => Branches.id, {
    onDelete: "cascade",
  }),
  semesterId: t.text().references(() => Semesters.id, {
    onDelete: "cascade",
  }),
  section: t.text().references(() => Sections.id, {
    onDelete: "cascade",
  }),
  batch: t.text().references(() => Batches.id, { onDelete: "cascade" }),
}));

export const insertCalendarBranchSchema = createInsertSchema(CalendarBranches);
export const updateCalendarBranchSchema = createUpdateSchema(CalendarBranches);

// Calendar Event Relations
export const calendarEventRelations = relations(Calendar, ({ many }) => ({
  calendarBranches: many(CalendarBranches),
}));

// Calendar Branches Relations
export const calendarBranchesRelations = relations(
  CalendarBranches,
  ({ one }) => ({
    CalendarEvent: one(Calendar, {
      fields: [CalendarBranches.calendarId],
      references: [Calendar.id],
    }),
    Branch: one(Branches, {
      fields: [CalendarBranches.branchId],
      references: [Branches.id],
    }),
    Semester: one(Semesters, {
      fields: [CalendarBranches.semesterId],
      references: [Semesters.id],
    }),
  }),
);
