import { createId } from "@paralleldrive/cuid2";
import { relations } from "drizzle-orm";
import { createInsertSchema, createUpdateSchema } from "drizzle-zod";
import { z } from "zod";

import { pgTable } from "./_table";
import { Branches } from "./branches";
import { Semesters } from "./semesters";

export const Subjects = pgTable("subjects", (t) => ({
  id: t
    .text()
    .$defaultFn(() => createId())
    .primaryKey(),
  title: t.text().notNull(),
  branchId: t
    .text()
    .notNull()
    .references(() => Branches.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),
  semesterId: t
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

//schemas
export const insertSubjectSchema = createInsertSchema(Subjects);
export const updateSubjectsSchema = createUpdateSchema(Subjects, {
  id: z.string().min(1, "Id must be provided"),
});

export const subjectsRelations = relations(Subjects, ({ one }) => ({
  branch: one(Branches, {
    fields: [Subjects.branchId],
    references: [Branches.id],
  }),
  semester: one(Semesters, {
    fields: [Subjects.semesterId],
    references: [Semesters.id],
  }),
}));
