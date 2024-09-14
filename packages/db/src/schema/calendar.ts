import { relations } from "drizzle-orm";
import { boolean, integer, serial, text, timestamp } from "drizzle-orm/pg-core";
import { createSelectSchema } from "drizzle-zod";

import { pgTable } from "./_table";
import { branches } from "./branches";
import { audienceTypeEnum, eventTypeEnum } from "./enum";
import { semesters } from "./semesters";

export const calendar = pgTable("calendar", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  event_type: eventTypeEnum("event_type").notNull(),
  audience_type: audienceTypeEnum("audience_type").notNull(),
  is_all_day: boolean("is_all_day").default(false),
  start_date: timestamp("start_date").notNull(),
  end_date: timestamp("end_date"),
  location: text("location"),
  attachment_url: text("attachment_url"),
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at"),
});

export const selectCalendarSchema = createSelectSchema(calendar);

// Calendar Branches Relation Table
export const calendarBranches = pgTable("calendar_branches", {
  id: serial("id").primaryKey(),
  calendar_id: integer("calendar_id")
    .notNull()
    .references(() => calendar.id, { onDelete: "cascade" }),
  branch_id: integer("branch_id")
    .notNull()
    .references(() => branches.id, { onDelete: "cascade" }),
  semester_id: integer("semester_id").references(() => semesters.id, {
    onDelete: "cascade",
  }),
  section: text("section"),
  batch: text("batch"),
});
// Calendar Event Relations
export const calendarEventRelations = relations(calendar, ({ many }) => ({
  calendarBranches: many(calendarBranches),
}));

// Calendar Branches Relations
export const calendarBranchesRelations = relations(
  calendarBranches,
  ({ one }) => ({
    calendarEvent: one(calendar, {
      fields: [calendarBranches.calendar_id],
      references: [calendar.id],
    }),
    branch: one(branches, {
      fields: [calendarBranches.branch_id],
      references: [branches.id],
    }),
    semester: one(semesters, {
      fields: [calendarBranches.semester_id],
      references: [semesters.id],
    }),
  }),
);
