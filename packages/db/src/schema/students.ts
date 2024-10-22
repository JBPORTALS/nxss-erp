import { relations } from "drizzle-orm";
import {
  date,
  integer,
  pgEnum,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

import { pgTable } from "./_table";
import { branches } from "./branches";
import { batches } from "./groups";
import { semesters } from "./semesters";

export const profileStatusEnum = pgEnum("profileStatusEnum", [
  "active",
  "inactive",
]);

export const students = pgTable("students", {
  id: serial("id").primaryKey(),
  full_name: text("full_name").notNull(),
  email: text("email").notNull(),
  phone_number: text("phone_number"),
  date_of_birth: date("date_of_birth"),
  year_of_join: integer("year_of_join"),
  status: profileStatusEnum("status").default("active"),
  clerk_user_id: text("clerk_user_id"),
  clerk_org_id: text("clerk_org_id").notNull(),
  branch_id: integer("branch_id")
    .notNull()
    .references(() => branches.id),
  batch_id: integer("batch_id").references(() => batches.id, {
    onDelete: "set null",
  }),
  current_semester_id: integer("current_semester_id")
    .notNull()
    .references(() => semesters.id),
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at"),
});

export const studentsRelations = relations(students, ({ one }) => ({
  branch: one(branches, {
    fields: [students.branch_id],
    references: [branches.id],
  }),
  currentSemester: one(semesters, {
    fields: [students.current_semester_id],
    references: [semesters.id],
  }),
}));
