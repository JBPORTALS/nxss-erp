import { createId } from "@paralleldrive/cuid2";
import { relations } from "drizzle-orm";
import { pgEnum, text } from "drizzle-orm/pg-core";

import { pgTable } from "./_table";
import { Branches } from "./branches";
import { Batches } from "./groups";
import { Semesters } from "./semesters";

export const profileStatusEnum = pgEnum("profile_status_enum", [
  "active",
  "inactive",
]);

export const Students = pgTable("students", (t) => ({
  id: t
    .text()
    .$defaultFn(() => createId())
    .primaryKey(),
  fullName: t.text().notNull(),
  email: text().notNull(),
  phoneNumber: text(),
  dob: t.date(),
  yearOfJoin: t.integer(),
  status: profileStatusEnum("status").default("active"),
  clerkUserId: t.text(),
  clerkOrgId: t.text().notNull(),
  branchId: t
    .text()
    .notNull()
    .references(() => Branches.id),
  batchId: t.text().references(() => Batches.id, {
    onDelete: "set null",
  }),
  currentSemesterId: t
    .text()
    .notNull()
    .references(() => Semesters.id),
  createdAt: t
    .timestamp({ mode: "date", withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: t
    .timestamp({ mode: "date", withTimezone: true })
    .$onUpdateFn(() => new Date()),
}));

export const studentsRelations = relations(Students, ({ one }) => ({
  Branch: one(Branches, {
    fields: [Students.branchId],
    references: [Branches.id],
  }),
  CurrentSemester: one(Semesters, {
    fields: [Students.currentSemesterId],
    references: [Semesters.id],
  }),
  Batch: one(Batches, {
    fields: [Students.batchId],
    references: [Batches.id],
  }),
}));
