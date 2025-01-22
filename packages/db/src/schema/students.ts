import { createId } from "@paralleldrive/cuid2";
import { relations } from "drizzle-orm";
import { pgEnum, text, uniqueIndex } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

import { pgTable } from "./_table";
import { Branches } from "./branches";
import { Batches } from "./groups";
import { Semesters } from "./semesters";

export const profileStatusEnum = pgEnum("profile_status_enum", [
  "active",
  "inactive",
]);

export const Students = pgTable(
  "students",
  (t) => ({
    id: t
      .text()
      .$defaultFn(() => createId())
      .primaryKey(),
    fullName: t.text(),
    email: text().unique().notNull(),
    phoneNumber: text(),
    dob: t.date(),
    yearOfJoin: t.integer(),
    status: profileStatusEnum("status").default("active"),
    clerkUserId: t.text(),
    clerkInstitutionId: t.text().notNull(),
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
  }),
  (t) => ({
    uniqueEmailIndex: uniqueIndex("unique_email_index").on(t.email),
  }),
);

export const insertStudentSchema = createInsertSchema(Students);
export const updateStudentSchema = createInsertSchema(Students, {
  id: z.string().nonempty(),
  branchId: z.string().optional(),
  clerkInstitutionId: z.string().optional(),
  email: z.string().optional(),
  currentSemesterId: z.string().optional(),
});

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
