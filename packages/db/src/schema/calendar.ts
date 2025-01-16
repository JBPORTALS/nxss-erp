import { createId } from "@paralleldrive/cuid2";
import { relations } from "drizzle-orm";
import { createSelectSchema } from "drizzle-zod";

import { pgTable } from "./_table";
import { Branches } from "./branches";
import { audienceTypeEnum, eventTypeEnum } from "./enum";
import { Batches, Sections } from "./groups";
import { Semesters } from "./semesters";

export const calendar = pgTable("calendar", (t) => ({
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

export const selectCalendarSchema = createSelectSchema(calendar);

// Calendar Branches Relation Table
export const calendarBranches = pgTable("calendar_branches", (t) => ({
  id: t
    .text()
    .$defaultFn(() => createId())
    .primaryKey(),
  calendarId: t
    .text()
    .notNull()
    .references(() => calendar.id, { onDelete: "cascade" }),
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

// Calendar Event Relations
export const calendarEventRelations = relations(calendar, ({ many }) => ({
  calendarBranches: many(calendarBranches),
}));

// Calendar Branches Relations
export const calendarBranchesRelations = relations(
  calendarBranches,
  ({ one }) => ({
    CalendarEvent: one(calendar, {
      fields: [calendarBranches.calendarId],
      references: [calendar.id],
    }),
    Branch: one(Branches, {
      fields: [calendarBranches.branchId],
      references: [Branches.id],
    }),
    Semester: one(Semesters, {
      fields: [calendarBranches.semesterId],
      references: [Semesters.id],
    }),
  }),
);
